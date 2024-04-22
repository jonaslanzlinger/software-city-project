const _initFrameCloseButtons = () => {
   const closeButtons = document.querySelectorAll(".button-close");
   closeButtons.forEach(button => {
      button.addEventListener("click", () => {
         const frame = button.parentElement;
         frame.style.display = "none";
      });
   });
}

export { _initFrameCloseButtons };