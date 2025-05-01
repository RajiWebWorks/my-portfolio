import express, { Express, Request, Response } from 'express';
import projectRoutes from './routes/projectRoutes';
import contactRoutes from './routes/contactRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API Running');
});

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;