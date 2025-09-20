import express from "express";
import mongoose from "mongoose";

const Fruit = mongoose.model(
  "fruit",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on("connecting", () =>
  console.log("[MongoDB] Connecting...")
);
mongoose.connection.on("connected", () => console.log("[MongoDB] Connected"));
mongoose.connection.on("error", (error) =>
  console.log("[MongoDB] Error in connection: ", error.message)
);

mongoose.connect(MONGO_URL);

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

app.get("/api/fruits", async (req, res) => {
  const fruits = await Fruit.find();
  // [{ name: "Apple" }, { name: "Banana" }, { name: "Cranberry" }]
  res.send({ data: { fruits } });
});

app.get("/error", (req, res) => {
  throw new Error("Error API Called");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
