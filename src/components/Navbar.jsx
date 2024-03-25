import React from "react";
import { FaSearch } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";

function Navbar({ navBackground }) {
    const [{ userInfo }] = useStateProvider();
    // const pic = userInfo.userPic;
    // console.log(pic.url);
    // console.log("user ka naam", userInfo?.userId);
    return (
        <div
            className={`container flex justify-between items-center p-8 h-[15vh] sticky top-0 transition-all duration-300 ease-in-out ${
                navBackground ? "bg-black bg-opacity-70" : "bg-transparent"
            } `}
        >
            <div className="serch_bar bg-white w-[30%] py-2 px-4 rounded-[2rem] flex items-center gap-2 ">
                <FaSearch />
                <input
                    className="rounded-none w-full h-8 outline-none"
                    type="text"
                    placeholder="Artists, Songs or Podcasts"
                />
            </div>
            <div className="avatar bg-black py-2 px-4 pr-8 flex justify-center items-center rounded-[2rem] gap-2 ">
                <a
                    className="flex justify-center items-center gap-2 no-underline text-white font-bold "
                    href="#"
                >
                    <img
                        className="h-[2rem] w-[2rem] bg-[#282828] p-1 rounded-2xl"
                        src={userInfo?.userPic}
                        alt="profile_pic"
                    />
                    <span>{userInfo?.userName}</span>
                </a>
            </div>
        </div>
    );
}

export default Navbar;
