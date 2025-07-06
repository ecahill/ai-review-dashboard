import express from 'express';
import productsRouter from './routes/products';
import reviewsRouter from './routes/reviews';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});