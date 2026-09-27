import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'awake',
  })
})

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

export default app;
