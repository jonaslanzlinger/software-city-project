const _initFrameDraggable = () => {
   const frameInfo = document.getElementById("frame-info");
   const frameModelTree = document.getElementById("frame-model-tree");

   let frameInfoOffsetLeft = 0, frameInfoOffsetTop = 0;

   frameInfo.addEventListener("mousedown", e => {
      let rect = frameInfo.getBoundingClientRect();
      frameInfoOffsetLeft = e.clientX - (rect.left + rect.width / 2);
      frameInfoOffsetTop = e.clientY - (rect.top + rect.height / 2);
      document.onmouseup = removeDrag;
      if (!(frameInfoOffsetLeft > (rect.width / 2 - 17) && frameInfoOffsetTop > (rect.height / 2 - 17))) {
         document.onmousemove = dragFrameInfo;
      }
   });

   let frameModelTreeOffsetLeft = 0, frameModelTreeOffsetTop = 0;
   frameModelTree.addEventListener("mousedown", e => {
      let rect = frameModelTree.getBoundingClientRect();
      frameModelTreeOffsetLeft = e.clientX - (rect.left + rect.width / 2);
      frameModelTreeOffsetTop = e.clientY - (rect.top + rect.height / 2);
      document.onmouseup = removeDrag;
      if (!(frameModelTreeOffsetLeft > (rect.width / 2 - 17) && frameModelTreeOffsetTop > (rect.height / 2 - 17))) {
         document.onmousemove = dragFrameModelTree;
      }
   });

   const removeDrag = e => {
      document.onmouseup = null;
      document.onmousemove = null;
   }

   const dragFrameInfo = e => {
      e.preventDefault();
      let rect = frameInfo.getBoundingClientRect();
      let newPosLeft = e.clientX - frameInfoOffsetLeft;
      let newPosTop = e.clientY - frameInfoOffsetTop;
      newPosLeft = (newPosLeft - rect.width / 2) < 0 ? rect.width / 2 : newPosLeft;
      newPosTop = (newPosTop - rect.height / 2) < 0 ? rect.height / 2 : newPosTop;
      newPosLeft = (newPosLeft + rect.width / 2) > window.innerWidth ? window.innerWidth - rect.width / 2 : newPosLeft;
      newPosTop = (newPosTop + rect.height / 2) > window.innerHeight ? window.innerHeight - rect.height / 2 : newPosTop;
      frameInfo.style.left = newPosLeft + "px";
      frameInfo.style.top = newPosTop + "px";
   }

   const dragFrameModelTree = e => {
      e.preventDefault();
      let rect = frameModelTree.getBoundingClientRect();
      let newPosLeft = e.clientX - frameModelTreeOffsetLeft;
      let newPosTop = e.clientY - frameModelTreeOffsetTop;
      newPosLeft = (newPosLeft - rect.width / 2) < 0 ? rect.width / 2 : newPosLeft;
      newPosTop = (newPosTop - rect.height / 2) < 0 ? rect.height / 2 : newPosTop;
      newPosLeft = (newPosLeft + rect.width / 2) > window.innerWidth ? window.innerWidth - rect.width / 2 : newPosLeft;
      newPosTop = (newPosTop + rect.height / 2) > window.innerHeight ? window.innerHeight - rect.height / 2 : newPosTop;
      frameModelTree.style.left = newPosLeft + "px";
      frameModelTree.style.top = newPosTop + "px";
   }
}

export { _initFrameDraggable };