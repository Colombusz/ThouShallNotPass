import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const passwordStrengthData = [
	{ category: "Weak", count: 150, complexityScore: 20 },
	{ category: "Moderate", count: 300, complexityScore: 50 },
	{ category: "Strong", count: 120, complexityScore: 70 },
	{ category: "Very Strong", count: 80, complexityScore: 90 },
];

const PasswordStrengthChart = () => {
	return (
		<motion.div
			className='bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='bg-white text-xl font-semibold text-black mb-4'>Password Strength Distribution</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={passwordStrengthData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='category' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey='count' fill='#8B5CF6' name='Password Count' />
						<Bar dataKey='complexityScore' fill='#10B981' name='Complexity Score' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default PasswordStrengthChart;
