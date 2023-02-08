class ShortenedLink {
  constructor(link) {
    this.link = link;
    this.dest = location.origin + "/" + this.link.dest;
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
    link.href = this.link.dest;
    link.target = "_blank";
    link.textContent = (location.origin + "/" + this.link.dest);

    dest.classList.add("dest");
    dest.appendChild(link);
    dest.appendChild(this.renderActions());
    return dest;
  }

  renderActions(){
    const ele = document.createElement("div");
    const clicked = document.createElement("p");
    const qrBtn = document.createElement("button");
    qrBtn.textContent = "QR";
    qrBtn.addEventListener("click", () => {
      togglePopup();

      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: this.dest,
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
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

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
  ele.append(new ShortenedLink(link));
}

function viewQRCode(){
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: "https://www.facebook.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    dotsOptions: {
      color: "#4267b2",
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

  qrCode.append(document.getElementById("canvas"));
}
