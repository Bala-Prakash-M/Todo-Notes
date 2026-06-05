import express from 'express';
import cors from 'cors'
import authRoutes from './src/modules/auth/auth.routes';

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

app.use('/api/auth', authRoutes);

export default app;