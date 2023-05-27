import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
  // const OPENAI_KEY = "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"; this is the key of personal
  // account
});

const openai = new OpenAIApi(configuration);
const app = express();
// const response = await openai.listEngines();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Variables
const PORT = process.env.PORT || 5000;
const personality = "";
const conversationStyle = "";

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Hey there welcome to Home Page !!",
  });
});

app.post("/api", async (req, res) => {
  const message = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.get("/api/dd", (req, res) => {
  const message = req.body;
  console.log(message);
  res.json(message);
});

// Getting the server live
app.listen(PORT, () => {
  console.log(`Server as started listening on port ${PORT}`);
});
