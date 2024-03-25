import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
    console.log("Component", currentlyPlaying);

    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);

            if (response.data !== "") {
                const { item } = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2]
                        ? item.album.images[2].url
                        : "#",
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
            }
            console.log("Currently Playing Song", currentlyPlaying);
        };
        getCurrentTrack();
    }, [token, dispatch, currentlyPlaying]);

    // console.log(currentlyPlaying);
    return (
        <div>
            {currentlyPlaying && (
                <div className="track flex items-center gap-4">
                    <div className="track_image">
                        <img
                            src={currentlyPlaying.image}
                            alt="currentlyPlaying_image"
                        />
                    </div>
                    <div className="track_info flex flex-col gap-[0.3rem]">
                        <h4 className="text-white">{currentlyPlaying.name}</h4>
                        <h6 className="text-white">
                            {currentlyPlaying.artists.join(", ")}
                        </h6>
                    </div>
                    <h1>Something is playing</h1>
                </div>
            )}
        </div>
    );
}
