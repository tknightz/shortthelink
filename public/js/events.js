inputLinkEle.addEventListener("paste", (e) => {
  const data = (event.clipboardData || window.clipboardData).getData('text');
  submitLink(data).then(link => createLinkComponent(link));
});

inputLinkEle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitLink(inputLinkEle.value).then(link => createLinkComponent(link));
})


popupCover.addEventListener("click", togglePopup);
