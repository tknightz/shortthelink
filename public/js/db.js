const request = window.indexedDB.open("shortened-links", 1);
let db = null;

request.onsuccess = (event) => {
  db = request.result;
  retrieveData().then(links => {
    links
      .sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      })
      .map(createLinkComponent);
  });
};

request.onerror = (event) => {
  console.error("Error while opening indexedDB!");
};
request.onupgradeneeded  = (event) => {
  db = event.target.result;

  const objectStore = db.createObjectStore("links", { keyPath: "dest" });
  objectStore.createIndex("source", "source", { unique: false });
};

function retrieveData(){
  return new Promise((resolve, reject) => {
    const links = [];
    const objectStore = db.transaction("links").objectStore("links");
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (!cursor) return resolve(links);

      links.push(cursor.value);
      cursor.continue();
    }
  })
}

function pushLinkToDb(link){
  const transaction = db.transaction(["links"], "readwrite");
  const objectStore = transaction.objectStore("links");
  objectStore.add(link);
}
