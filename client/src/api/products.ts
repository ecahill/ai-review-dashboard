import axios from 'axios';

export async function fetchProducts() {
    const res = await axios.get('/api/products');
    return res.data;
}