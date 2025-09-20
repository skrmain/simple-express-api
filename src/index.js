import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const d = new Date().toISOString();
  console.log(`[DEBUG] ${d} | ${req.method} | ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <p>Express 🏡 + Railway 🚈🚈</p>
    </body>
    </html>
    `);
});

app.get("/api/data", (req, res) => {
  res.send({ data: [{ name: "Apple" }, { name: "Banana" }, { name: "Cranberry" }] });
});

app.get("/error", (req, res) => {
  throw new Error("Error API Called");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
