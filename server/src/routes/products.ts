import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Products route works!');
});

export default router;