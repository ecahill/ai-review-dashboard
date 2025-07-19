import React from 'react';

type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
};

type Props = {
    product: Product;
    onClick?: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onClick }) => (
    <div onClick={onClick} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 12, cursor: 'pointer' }}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
    </div>
);

export default ProductCard;
