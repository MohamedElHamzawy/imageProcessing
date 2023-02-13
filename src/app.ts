import express from 'express';
import imageRoutes from './routes/allRoutes';
//eslint-disable-next-line
require('dotenv').config();

const app = express();
const port: number = process.env.PORT as unknown as number;
app.use(express.json());
app.use('/api/image', imageRoutes);

app.listen(port, () => {
  console.log(`Server is Running on ${port} ...`);
});

export default app;
