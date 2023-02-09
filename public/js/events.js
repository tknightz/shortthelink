inputLinkEle.addEventListener("paste", (e) => {
  const data = (event.clipboardData || window.clipboardData).getData('text');
  submitLink(data)
    .then(link => {
      createLinkComponent(link)
      pushLinkToDb(link);
    })
    .catch(console.error);
});

inputLinkEle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitLink(inputLinkEle.value)
      .then(link => {
        createLinkComponent(link)
        pushLinkToDb(link);
      })
      .catch(console.error)
  }
})


popupCover.addEventListener("click", togglePopup);
