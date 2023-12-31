const { uptime } = require("process");
const {
  getData,
  getDataType,
  set,
  setCsv,
  clearDataStore,
} = require("../../application/services/getDataService");
const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function initializeEndpoints(app) {
  app.get("/", (req, res) => {
    res.render("index", { message: "Data Analyzer" });
  });

  app.get("/view/", (req, res) => {
    console.log(getData());
    res.render("datastore", { message: "View Datastore", data: getData() });
  });

  app.post("/upload/", upload.single("file"), (req, res) => {
    console.log("Processing file-upload...");

    let fileFormat = req.body["file-format"];

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const csvData = req.file.buffer.toString("utf8");
    setCsv(csvData, fileFormat);

    console.log("File-upload processed.");

    res.render("index", { message: "File successfully uploaded" });
  });

  app.get("/clear-datastore/", (req, res) => {
    clearDataStore();
    res.render("index", { message: "Datastore cleared" });
  });

  app.get("/api/", (req, res) => {
    const data = getData();

    res.setHeader("Content-Type", "application/json");
    res.json({ data: data, dataType: getDataType() });
  });

  app.post("/api/", (req, res) => {
    const requestData = req.body;
    set(requestData);

    res.json({ message: "Data received successfully", data: requestData });
  });

  app.post("/api/setCsv/:fileFormat/", (req, res) => {
    const fileFormat = req.params.fileFormat;
    console.log(fileFormat);
    const requestData = req.body.data;

    setCsv(requestData, fileFormat);
    res.json({ message: "Data received successfully", data: requestData });
  });

  app.delete("/api/", (req, res) => {
    clearDataStore();

    res.json({ message: "Data deleted successfully" });
  });
}

module.exports = {
  initializeEndpoints,
};
