import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const passwordStrengthData = [
	{ name: "Jul", avgStrength: 2.8 },
	{ name: "Aug", avgStrength: 3.2 },
	{ name: "Sep", avgStrength: 3.6 },
	{ name: "Oct", avgStrength: 3.9 },
	{ name: "Nov", avgStrength: 4.1 },
	{ name: "Dec", avgStrength: 4.3 },
	{ name: "Jan", avgStrength: 4.0 },
	{ name: "Feb", avgStrength: 4.2 },
	{ name: "Mar", avgStrength: 4.5 },
	{ name: "Apr", avgStrength: 4.6 },
	{ name: "May", avgStrength: 4.8 },
	{ name: "Jun", avgStrength: 4.9 },
];

const PasswordStrengthOverviewChart = () => {
	return (
		<motion.div
			className="bg-white shadow-lg rounded-xl p-6 border border-gray-300"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-800">Average Password Strength Over Time</h2>

			<div className="h-80">
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={passwordStrengthData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
						<XAxis
							dataKey={"name"}
							stroke="black"
							tick={{ fill: "black", fontWeight: "bold" }} // Set the default tick text color to black
							activeTick={{ fill: "black", fontWeight: "bold" }} // Ensure the tick is bold when active
						/>
						<YAxis stroke="black" label={{ value: "Strength", angle: -90, position: "insideLeft" }} />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(255, 255, 255, 0.9)",
								borderColor: "#E5E7EB",
							}}
							itemStyle={{ color: "#4B5563" }}
						/>
						<Line
							type="monotone"
							dataKey="avgStrength"
							stroke="#1D4ED8" // Dark blue for the line
							strokeWidth={3}
							dot={{ fill: "#1D4ED8", strokeWidth: 2, r: 6 }}
							activeDot={{
								r: 8,
								strokeWidth: 2,
								fill: "#1D4ED8", // Color of the dot when hovered
								stroke: "black", // Border color when hovered
							}}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default PasswordStrengthOverviewChart;
