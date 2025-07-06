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
    const { productId, reviewText } = req.body;

    if (!productId || !reviewText ) {
        return res.status(400).json({ error: 'Product ID and review text are required' });
    }

    try {
        // TODO: Call AI sentiment service
        const sentiment = 'neutral'; // Placeholder for AI sentiment analysis
        const ai_confidence = 0.75; // Placeholder for AI confidence score

        const result = await pool.query(
            `INSERT INTO reviews (product_id, review_text, sentiment, ai_confidence)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [productId, reviewText, sentiment, ai_confidence]
        );
        return res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('ERror inserting review:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default router;
