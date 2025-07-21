import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#FF4444']; // positive, neutral, negative

type SentimentData = {
  label: string;
  value: number;
};

const SentimentChart = ({ data }: { data: SentimentData[] }) => (
<ResponsiveContainer width="100%" height={250}>
    <PieChart width={200} height={200}>
        <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        dataKey="value"
        label
        >
        {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
        </Pie>
        <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default SentimentChart;