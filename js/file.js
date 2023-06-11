let fileInputs = document.querySelectorAll(".file-item");

fileInputs.forEach(function (file) {
  file.addEventListener("change", function () {
    if (this.value != "") {
      const activeFile = this.closest("label").querySelector(".file-button");
      activeFile.classList.add("active");
    } else {
      activeFile.classList.remove("active");
    }
  });
});
