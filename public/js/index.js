function sendReq(method, url, data){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader("content-type", "application/json");
    req.send(JSON.stringify(data));
    req.onreadystatechange = function() {
      if (req.readyState === 4){
        if (req.status === 200) resolve(req.responseText);
        else reject(req.responseText);
      }
    }
  })
}

function isValidURL(url){
  const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  return regex.test(url);
}

async function submitLink(link){
  if (!isValidURL(link)) return;
  try {
    const response = await sendReq("POST", "/shortlink", { link });
    return JSON.parse(response);
  } catch (error) {
    console.error(error);
  }
}

function togglePopup(){
  const popupDisplay = popup.style.display;
  popup.style.display = popupDisplay === "flex" ? "none" : "flex";
}
