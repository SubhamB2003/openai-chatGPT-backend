import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
    try {
        const { question } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).json(response.data.choices[0].text);

    } catch (err) {
        res.status(400).json({ message: err.message + "____________-" });
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server run on ${process.env.PORT}`);
})