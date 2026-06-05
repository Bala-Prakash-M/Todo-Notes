import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());

app.get('/test', async (req, res) => {

 try {

  res.json({ success: true, message: "Test route is working!" });

 } catch (error) {

  console.error("Error in /test route:", error);
  res.status(500).json({ error: "Internal Server Error" });

 }
})

export default app;