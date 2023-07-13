const inputFile = document.querySelector("input");
const btn = document.querySelector("button");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  btn.innerText = "Downloading File";
  setTimeout(() => {
    fetchFile(inputFile.value);
    inputFile.value = "";
  }, 2000);
});

function fetchFile(url) {
  try {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let tempURL = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempURL;
        aTag.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempURL);
        btn.innerText = "Download File";
      });
  } catch (err) {
    btn.innerText = "Download File";
    alert("Failed to Download");
  }
}
