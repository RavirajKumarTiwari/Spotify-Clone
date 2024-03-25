import React from "react";
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

export default function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data !== "") {
            const { item } = response.data;
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artists: item.artists.map((artist) => artist.name),
                image: item.album.images[2] ? item.album.images[2].url : "#",
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        } else
            dispatch({
                type: reducerCases.SET_PLAYING,
                currentlyPlaying: null,
            });
    };

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };

    return (
        <div className="container flex items-center justify-center gap-8 ">
            <div className="shuffle">
                <BsShuffle className="text-[#b3b3b3] transition-all duration-300 ease-in-out hover:text-white" />
            </div>
            <div className="previous text-[2rem]">
                <CgPlayTrackPrev
                    className="text-[#b3b3b3] transition-all duration-300 ease-in-out hover:text-white"
                    onClick={() => changeTrack("previous")}
                />
            </div>
            <div className="state text-[2rem]">
                {playerState ? (
                    <BsFillPauseCircleFill
                        className="text-white transition-all duration-300 ease-in-out hover:text-white"
                        onClick={changeState}
                    />
                ) : (
                    <BsFillPlayCircleFill
                        className="text-white transition-all duration-300 ease-in-out hover:text-white"
                        onClick={changeState}
                    />
                )}
            </div>
            <div className="next text-[2rem]">
                <CgPlayTrackNext
                    className="text-[#b3b3b3] transition-all duration-300 ease-in-out hover:text-white"
                    onClick={() => changeTrack("next")}
                />
            </div>
            <div className="repeate">
                <FiRepeat className="text-[#b3b3b3] transition-all duration-300 ease-in-out hover:text-white" />
            </div>
        </div>
    );
}
