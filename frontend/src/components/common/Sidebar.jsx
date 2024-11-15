import { BarChart2, Users, TrendingUp, Settings, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "text-[#3A1078]", // Purple for better contrast
    href: "/",
  },
  { name: "Users", icon: Users, color: "text-[#4E31AA]", href: "/users" }, // Blue for better contrast
  { name: "Analytics", icon: TrendingUp, color: "text-[#2F58CD]", href: "/analytics" }, // Teal for a fresh look
  { name: "Settings", icon: Settings, color: "text-[#3795BD]", href: "/settings" }, // Light Blue for settings
];
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-white p-4 flex flex-col border-r border-[#B9E5E8]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-[#A0E9FF] transition-colors max-w-fit"
        >
          <Menu size={24} className="text-[#133E87]" />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-lg font-medium text-black rounded-lg hover:bg-[#A0E9FF] transition-colors mb-2">
                <item.icon size={24} className={item.color} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Log Out Button */}
        <div className="mt-auto">
          <Link to="/logout">
            <motion.div
              className="flex items-center p-4 text-lg font-medium text-black rounded-lg hover:bg-[#A0E9FF] transition-colors mt-2"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LogOut size={24} className="text-[#FF0000]" />
              {isSidebarOpen && (
                <motion.span className="ml-4 text-[#FF0000]">Log Out</motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
