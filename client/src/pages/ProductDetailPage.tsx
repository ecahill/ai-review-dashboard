import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SentimentChart from '../components/SentimentChart';
import '../App.css';

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

type Review = {
  id: number;
  product_id: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  ai_confidence: number;
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const productRes = await fetch(`/api/products/${id}`);
            const productData: Product = await productRes.json();
            setProduct(productData);

            const reviews = await fetch(`/api/reviews?productId=${id}`);
            const reviewData: Review[] = await reviews.json();
            setReviews(reviewData);
        };

        fetchData();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-container">
            <button onClick={() => window.history.back()}>← Back</button>
            <h2>{product.name}</h2>
            <p>{product.description}</p>

            <h3>Reviews</h3>
            {reviews.length === 0 && <p>No reviews yet.</p>}
            {reviews.map((review) => (
                <div key={review.id}>
                    <p>{review.text}</p>
                    <span style={{ color: getSentimentColor(review.sentiment) }}>
                    ● {review.sentiment}
                    </span>
                    <span style={{ color: '#555' }}>
                        Confidence: {(review.ai_confidence * 100).toFixed(1)}%
                    </span>
                    </div>
            ))}
<h3>Sentiment Breakdown</h3>
<div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
  <SentimentChart
    data={[
      { label: 'positive', value: 5 },
      { label: 'neutral', value: 2 },
      { label: 'negative', value: 3 },
    ]}
  />
</div>
        </div>
    );
};

const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
        case 'positive':
            return 'green';
        case 'negative':
            return 'red';
        case 'neutral':
            return 'gray';
        default:
            return 'black';
    }
};

export default ProductDetailPage;



