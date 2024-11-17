import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UsersTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/users/list");
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = users.filter(
            (user) => user.fname.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/users/delete/${id}`);
                    setUsers(users.filter(user => user.id !== id));
                    setFilteredUsers(filteredUsers.filter(user => user.id !== id));
                    toast.success("User deleted successfully");
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            }
        });
    };

    return (
        <motion.div
            className='bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-black'>Users</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search users...'
                        className='bg-gray-700 text-white placeholder-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-black' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
                                ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
                                Email
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
                                Role
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-700'>
                        {filteredUsers.map((user) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-black'>{user.id}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-10 w-10'>
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                {user.fname.charAt(0)}
                                            </div>
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium text-black'>{user.fname}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-black'>{user.email}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
                                        {user.role.role}
                                    </span>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm text-black'>
                                    <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
                                    <button className='text-red-400 hover:text-red-300' onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UsersTable;