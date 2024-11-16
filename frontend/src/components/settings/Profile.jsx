import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5qn-GuWwc6EFc-xcy9haXoDY0YoVZEgwQ8Q&s'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-[black]'>Python React</h3>
					<p className='text-[black]'>python@example.com</p>
				</div>
			</div>

			<button className='bg-[#89CFF3] hover:bg-[#00A9FF] text-black font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button>
		</SettingSection>
	);
};
export default Profile;
