import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
};

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('Error fetching products:', err));
    }, []);

    return (
        <div>
            <h1>All Products</h1>
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    product={product}
                    onClick={() => navigate(`/products/${product.id}`)}
                />
            ))}
        </div>
    );
};

export default ProductsPage;