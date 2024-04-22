import { _initNavbarButtons } from "./navbar";
import { _initFrameCloseButtons } from "./frame";
import { _initFrameDraggable } from "./frameDraggable";
import { bindClearTable } from "./table";
import { bindUploadData } from "./frameUpload";
import { bindSaveConfig } from "./frameConfig";
import { bindStartVisualize } from "./frameVisualize";

class View {

   constructor() {
      _initNavbarButtons();
      _initFrameCloseButtons();
      _initFrameDraggable();

      this.bindClearTable = bindClearTable;

      this.bindUploadData = bindUploadData;
      this.bindSaveConfig = bindSaveConfig;
      this.bindStartVisualize = bindStartVisualize;

   }
}

export { View };