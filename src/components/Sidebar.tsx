"use client";

import Link from "next/link";
import React from "react";
import "../app/scrollbar.css";
import CustomIcon from "./CustomIcon";
import {
  faSignal,
  faChartBar,
  faUser,
  faCogs,
  faList,
  faHome,
  faFolderOpen,
  faPhotoVideo,
  faCalendar,
  faBook,
  faHeader,
} from "@fortawesome/free-solid-svg-icons";

interface MenuItem {
  name: string;
  slug: string;
  icon: any; // or use the specific type if applicable
}

function Sidebar() {
  const menuItems: MenuItem[] = [
    {
      name: "AMPD",
      slug: "ampd",
      icon: faSignal,
    },
    {
      name: "AMPD[New]",
      slug: "ampd-new",
      icon: faChartBar, // Example icon, replace with actual if needed
    },
    {
      name: "AMPD Stats",
      slug: "ampd-stats",
      icon: faChartBar, // Example icon
    },
    {
      name: "User List",
      slug: "userlist",
      icon: faUser, // Example icon
    },
    {
      name: "Site Analytics",
      slug: "site-analytics",
      icon: faChartBar, // Example icon
    },
    {
      name: "1851 University",
      slug: "1851-university",
      icon: faHome, // Example icon
    },
    {
      name: "Supplier Management",
      slug: "supplier-management",
      icon: faFolderOpen, // Example icon
    },
    {
      name: "Growth Club Management",
      slug: "growth-club-management",
      icon: faFolderOpen, // Example icon
    },
    {
      name: "Issues Feature Image",
      slug: "issues-feature-image",
      icon: faFolderOpen, // Example icon
    },
    {
      name: "Site Log",
      slug: "site-log",
      icon: faPhotoVideo, // Example icon
    },
    {
      name: "Activity Log",
      slug: "activity-log",
      icon: faList, // Example icon
    },
    {
      name: "Pending Stats",
      slug: "pending-stats",
      icon: faFolderOpen, // Example icon
    },
    {
      name: "Page Contents",
      slug: "page-contents",
      icon: faCalendar, // Example icon
    },
    {
      name: "Home Navigation Bar",
      slug: "home-navigation-bar",
      icon: faFolderOpen, // Example icon
    },
    {
      name: "Terms",
      slug: "terms",
      icon: faBook, // Example icon
    },
    {
      name: "Categories",
      slug: "categories",
      icon: faHeader, // Example icon
    },
    {
      name: "Events",
      slug: "events",
      icon: faList, // Example icon
    },
    {
      name: "Settings",
      slug: "settings",
      icon: faCogs, // Example icon
    },
    // Add other menu items
  ];

  return (
    <div className="w-[270px] md:w-[280px] bg-[#263238] px-4 py-4 flex-col gap-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 overflow-y-auto overflow-x-hidden h-auto md:h-screen transition-all duration-300 hidden md:flex">
      {/* User Section */}
      <div id="user" className="flex gap-4 items-center mb-2 mt-2">
        <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-white">D</span>
        </div>
        <h3 className="text-lg text-white">Devteam!</h3>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3 ml-1">
        {menuItems.map((item: MenuItem, idx: number) => (
          <div key={idx} className="flex items-center">
            <div id="icon" className="w-4 text-center flex-shrink-0">
              <CustomIcon
                icon={item.icon}
                size="lg"
                className="text-slate-100"
              />
            </div>
            <Link
              href={item.slug}
              className="w-full text-left text-sm md:text-md ml-4 text-slate-100 whitespace-nowrap"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
