import { analyzeSentiment } from '../utils/analyzeSentiment'
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
    const { product_id, review_text } = req.body;

    if (!product_id || !review_text ) {
        return res.status(400).json({ error: 'Product ID and review text are required' });
    }

    try {
        const { sentiment, ai_confidence } = await analyzeSentiment(review_text);

        const result = await pool.query(
            `INSERT INTO reviews (product_id, review_text, sentiment, ai_confidence)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [product_id, review_text, sentiment, ai_confidence]
        );
        return res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('ERror inserting review:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { review_text } = req.body;

    if (!review_text) {
        return res.status(400).json({ error: 'Review text is required' });
    }

    try {
        const { sentiment, ai_confidence } = await analyzeSentiment(review_text);

        const result = await pool.query(
            `UPDATE reviews
            SET review_text = $1, sentiment = $2, ai_confidence = $3
            WHERE id = $4
            RETURNING *`,
            [review_text, sentiment, ai_confidence, id]
        );
        if (result.rows.length === 0 ) {
            return res.status(404).json({ error: 'Review not found' });
        }
        return res.json(result.rows[0]); // Return the updated review
    } catch (err) {
        console.error('Error updating review:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query(
            `DELETE FROM reviews
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        return res.json({ message: 'Product deleted', product: result.rows[0] });
    } catch (err) {
        console.error('Error deleting review:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default router;
