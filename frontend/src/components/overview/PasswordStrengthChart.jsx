import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const COLORS = ["#00A9FF", "#89CFF3", "#A0E9FF", "#CDF5FD"];

const PASSWORD_STRENGTH_DATA = [
	{ name: "Very Strong", value: 12000 },
	{ name: "Strong", value: 22000 },
	{ name: "Medium", value: 34000 },
	{ name: "Weak", value: 18000 },
];

const PasswordStrengthChart = () => {
	return (
		<motion.div
			className='bg-white shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-800'>Password Strength Distribution</h2>

			<div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={PASSWORD_STRENGTH_DATA}>
						<CartesianGrid strokeDasharray='3 3' stroke='#E5E7EB' />
						<XAxis dataKey='name' stroke='#4B5563' />
						<YAxis stroke='#4B5563' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(255, 255, 255, 0.9)",
								borderColor: "#E5E7EB",
							}}
							itemStyle={{ color: "#1F2937" }}
						/>
						<Legend />
						<Bar dataKey={"value"} fill='#8884d8'>
							{PASSWORD_STRENGTH_DATA.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default PasswordStrengthChart;
