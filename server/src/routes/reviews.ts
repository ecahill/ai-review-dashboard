import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const { productId, reviewText, rating } = req.body;

    if (!productId || !reviewText || !rating) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    try {
        const result = await pool.query(
            'INSERT INTO reviews (product_id, review_text, rating) VALUES ($1, $2, $3) RETURNING *',
            [productId, reviewText, rating]
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

export default router;
