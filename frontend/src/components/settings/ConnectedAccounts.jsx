import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";

const ConnectedAccounts = () => {
	const [connectedAccounts, setConnectedAccounts] = useState([
		{
			id: 1,
			name: "Google",
			connected: true,
			icon: "/google.png",
		},
		{
			id: 2,
			name: "Facebook",
			connected: false,
			icon: "/facebook.svg",
		},
		{
			id: 3,
			name: "Twitter",
			connected: true,
			icon: "/x.png",
		},
	]);

	return (
		<SettingSection icon={HelpCircle} title={"Connected Accounts"}>
			{connectedAccounts.map((account) => (
				<div key={account.id} className="flex items-center justify-between py-3">
					<div className="flex gap-2">
						<img
							src={account.icon}
							alt="Social img"
							className="h-10 w-10 object-cover rounded-full border border-[#386490]"
						/>
						<span className="text-[black] font-medium">{account.name}</span> {/* Blue color for account name */}
					</div>
					<button
						className={`px-4 py-2 rounded-lg text-black font-semibold ${
							account.connected
								? "bg-[#CDF5FD] hover:bg-[#A0E9FF] text-[black]" // Light blue background for connected, darker blue text
								: "bg-[#89CFF3] hover:bg-[#00A9FF] text-[black]" // Medium blue for disconnected with darker blue text
						} transition duration-200`}
						onClick={() => {
							setConnectedAccounts(
								connectedAccounts.map((acc) => {
									if (acc.id === account.id) {
										return {
											...acc,
											connected: !acc.connected,
										};
									}
									return acc;
								})
							);
						}}
					>
						{account.connected ? "Connected" : "Connect"}
					</button>
				</div>
			))}
			<button className="mt-4 flex items-center text-[black] hover:text-[#386490] transition duration-200">
				<Plus size={18} className="mr-2" /> Add Account
			</button>
		</SettingSection>
	);
};

export default ConnectedAccounts;
