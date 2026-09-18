const express = require("express");
const test = new Map();
const app = express();
const PORT = 3080;
app.use(express.json());
// all routers together
app.use("/", require("./routers/index"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
