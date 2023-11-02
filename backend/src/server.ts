import app from './app';
import dotenv from 'dotenv' 
dotenv.config()

import cors from 'cors';

const PORT = process.env.PORT || 3001;
app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).send({ status: 'app is running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});