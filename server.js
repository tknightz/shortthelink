// env variables load them up
require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const client = require("./services/redis");
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
})

app.post("/shortlink", (req, res) => {
  const body = req.body;
  let key = (Math.random() + 1).toString(36).substring(2, 7);
  const value = {
    source: body.link,
    createdAt: new Date(),
    clicked: 0,
  }
  client.set(key, JSON.stringify(value));
  res.send({ source: body.link, ...value, dest: key })
})

app.patch("/shortlink", async (req, res) => {
  const body = req.body;
  const oldLink = body.oldLink;
  const data = await client.get(oldLink);
  if (!data) return res.status(400).json({ err: "Broken link!" });

  const newLinkData = await client.get(body.newLink);
  if (newLinkData) return res.status(400).json({ err: "newLink is existed! Try other link!" });

  const decodedData = JSON.parse(data);
  client.set(body.newLink, JSON.stringify({ ...decodedData, clicked: decodedData.clicked + 1 }));

  res.send({ ...decodedData, dest: body.newLink })
})

app.get("/:link", async (req, res) => {
  const link = req.params.link;
  const data = await client.get(link);
  if (!data) return res.send("Broken link!");

  const decodedData = JSON.parse(data);
  client.set(link, JSON.stringify({ ...decodedData, clicked: decodedData.clicked + 1 }));
  res.redirect(decodedData.source)
})

module.exports = app;
