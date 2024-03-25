import React from "react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";

function Sidebar() {
    return (
        <div className="container bg-black text-[#b3b3b3] flex flex-col h-[100%] w-[100%] ">
            <div className="top_links flex flex-col  ">
                <div className="sidebar_logo text-center my-4 mx-0">
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                        alt="spotify_logo"
                        className="w-4/5 h-auto"
                    />
                </div>
            </div>
            <ul className="list-none flex flex-col gap-4 p-4 font-semibold">
                <li className="flex gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white">
                    <MdHomeFilled />
                    <span>Home</span>
                </li>
                <li className="flex gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white">
                    <MdSearch />
                    <span>Search</span>
                </li>
                <li className="flex gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white">
                    <IoLibrary />
                    <span>Your Library</span>
                </li>
            </ul>
            <Playlists />
        </div>
    );
}

export default Sidebar;
