import express from "express";
import bodyParser from "body-parser";
import { ZodError } from "zod";
import { DocumentRequestSchema } from "./schema";
import { convertToBuffer, convertToStream } from "./convert";
import { validationErrorBuilder } from "./utils";

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const data = DocumentRequestSchema.parse(req.body);

    const pdfStream = await convertToStream(data);
    res.setHeader("Content-Type", "application/pdf");
    pdfStream.pipe(res);
    pdfStream.on("end", () => console.info("Done streaming, response sent."));
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: validationErrorBuilder(error) });
      return;
    }else{
      console.error(error);
      res.status(500).json({
        errors: {
          message: "An error occurred while processing your request",
          code: "INTERNAL_SERVER_ERROR",
        }
      });
    }
  }
});

app.get("/health", (req, res) => {
  res.send("OK");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
})
