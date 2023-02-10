class ShortenedLink {
  constructor(link) {
    this.link = link;
    this.dest = location.origin + "/" + this.link.dest;
    this.linkId = null;
    return this.render();
  }

  render(){
    const ele = document.createElement("li");
    const hr = document.createElement("hr");

    ele.classList.add("link")
    ele.appendChild(this.renderSource());
    ele.appendChild(hr);
    ele.appendChild(this.renderDest());
    return ele;
  }

  renderSource(){
    const source = document.createElement("div");
    const link = document.createElement("a");
    const createdAt = document.createElement("p");
    link.href = this.link.source;
    const rawLink = this.link.source;
    link.textContent = rawLink.length > 80 ? rawLink.substring(0, 80) + "..." : rawLink;
    createdAt.textContent = this.link.createdAt;

    source.classList.add("source");
    source.appendChild(link);
    source.appendChild(createdAt);
    return source;
  }

  renderDest(){
    const dest = document.createElement("div");
    const link = document.createElement("a");
    const prefix = document.createElement("p");
    this.linkId = document.createElement("p");
    this.linkId.classList.add("linkId");
    prefix.textContent = location.origin + "/";
    this.linkId.textContent = this.link.dest;
    this.linkId.disabled = true;

    this.linkId.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.linkId.setAttribute("contenteditable", false);
        const oldLink = this.link.dest;
        const newLink = this.linkId.innerText;
        editLink(oldLink, newLink)
          .then(res => {
            if (res.dest) {
              updateNewLink(oldLink, newLink);
              this.link.dest = res.dest;
              link.href = res.dest;
            }
            else this.linkId.innerText = oldLink;
          })
          .catch(() => this.linkId.innerText = oldLink)
      }
    })


    link.href = this.link.dest;
    link.target = "_blank";
    link.appendChild(prefix);
    link.appendChild(this.linkId);

    dest.classList.add("dest");
    dest.appendChild(link);
    dest.appendChild(this.renderActions());
    return dest;
  }

  renderActions(){
    const ele = document.createElement("div");
    const clicked = document.createElement("p");

    // qr btn handler
    const qrBtn = document.createElement("button");
    qrBtn.textContent = "🀫 QR Code";
    qrBtn.addEventListener("click", () => {
      togglePopup();

      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: location.origin + "/" + this.link.dest,
        image: "/favicon/favicon-32x32.png",
        dotsOptions: {
          color: "black",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#e9ebee",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20
        }
      });

      // remove existing qr img
      qrCanvas.innerHTML = "";
      qrCode.append(qrCanvas);
    })

    // edit btn handler
    const editBtn = document.createElement("button");
    editBtn.textContent = "🖋️ Edit";
    editBtn.addEventListener("click", () => {
      this.linkId.setAttribute("contenteditable", true);
      selectElementContents(this.linkId)
    })


    clicked.textContent = this.link.clicked + " clicked!";

    ele.classList.add("actions");
    ele.appendChild(clicked);
    ele.appendChild(qrBtn);
    ele.appendChild(editBtn);
    return ele;
  }
}

function createLinkComponent(link) {
  const ele = document.getElementById("shortened-links");
  ele.insertBefore(new ShortenedLink(link), ele.firstChild);
}
