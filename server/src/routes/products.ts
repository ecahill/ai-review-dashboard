import { Request, Response, Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/products
router.post('/', async (req: Request, res: Response) => {
    const { name, description, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({error: 'Name and price are required'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );

        res.status(201).json(result.rows[0]); //Return the newly created product
    } catch (err) {
        console.error('Error inserting product: ', err);
        res.status(500).json({ error: 'Server error'});
    }
});

// PUT /api/products/:id
router.put('/:id', async (req: Request, res: Response) => {
    const  { id } = req.params;
    const { name, description, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
        const result = await pool.query(
            `UPDATE products 
            SET name = $1, description = $2, price = $3
            WHERE id = $4
            RETURNING *`,
            [name, description, price, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(result.rows[0]); // Return the updated product
    } catch (err) {
        console.error('Error updating product:', err);
        return res.status(500).json({ error: 'Server errror' });
    }
});

// DELETE /api/products/:id
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM products
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.json({ message: 'Product deleted', product: result.rows[0] });
    } catch (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default router;