import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function Spotify() {
    const [{ token }, dispatch] = useStateProvider();
    const bodyRef = useRef(null);
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setheaderBackground] = useState(false);

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30
            ? setNavBackground(true)
            : setNavBackground(false);
        bodyRef.current.scrollTop >= 268
            ? setheaderBackground(true)
            : setheaderBackground(false);
    };

    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            // console.log({ data });
            const userInfo = {
                userId: data.id,
                userName: data.display_name,
                userEmail: data.email,
                userPic: data.images[0].url
            };
            dispatch({ type: reducerCases.SET_USER, userInfo });
        };
        getUserInfo();
    }, [dispatch, token]);

    return (
        <div className="max-w-[100vw] max-h-[100vh] overflow-hidden grid grid-rows-container ">
            <div className="spotify_body grid grid-cols-spotify_body h-[100%] w-[100%] bg-gradient bg-spotify_bg">
                <Sidebar />
                <div
                    className="body h-[100%] w-[100%] overflow-auto "
                    ref={bodyRef}
                    onScroll={bodyScrolled}
                >
                    <Navbar navBackground={navBackground} />
                    <div className="body_content">
                        <Body headerBackground={headerBackground} />
                    </div>
                </div>
            </div>
            <div className="spotify_footer">
                <Footer />
            </div>
        </div>
    );
}

export default Spotify;
