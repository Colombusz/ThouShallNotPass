import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Eye, ArrowDownRight, ArrowUpRight } from "lucide-react";

const overviewData = [
	{ name: "Passwords Analyzed", value: "12,345", change: 10.2, icon: Eye },
	{ name: "Weak Passwords", value: "1,234", change: -5.6, icon: AlertTriangle },
	{ name: "Average Strength", value: "4.2 / 5", change: 3.4, icon: Shield },
	{ name: "Common Patterns", value: "qwerty, 12345", change: 1.2, icon: CheckCircle },
];

const OverviewCards = () => {
	return (
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
			{overviewData.map((item, index) => (
				<motion.div
					key={item.name}
					className='bg-white backdrop-filter backdrop-blur-lg shadow-lg
            rounded-xl p-6 border border-gray-700
          '
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='text-sm font-medium text-black'>{item.name}</h3>
							<p className='mt-1 text-xl font-semibold text-black'>{item.value}</p>
						</div>

						<div
							className={`
              p-3 rounded-full bg-opacity-20 ${item.change >= 0 ? "bg-green-500" : "bg-red-500"}
              `}
						>
							<item.icon className={`size-6 ${item.change >= 0 ? "text-green-500" : "text-red-500"}`} />
						</div>
					</div>
					<div
						className={`
              mt-4 flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}
            `}
					>
						{item.change >= 0 ? <ArrowUpRight size='20' /> : <ArrowDownRight size='20' />}
						<span className='ml-1 text-sm font-medium'>{Math.abs(item.change)}%</span>
						<span className='ml-2 text-sm text-black'>vs last period</span>
					</div>
				</motion.div>
			))}
		</div>
	);
};
export default OverviewCards;
