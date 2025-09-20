import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(
    `[DEBUG] ${new Date().toISOString()} :: ${req.method} :: ${req.url}`
  );

  res.send({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
