import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { items } = response.data;
            const playlists = items.map((playlist) => ({
                name: playlist.name,
                id: playlist.id,
            }));
            // console.log(playlists);
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        };
        getPlaylistData();
    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };

    return (
        <div className="h-[100%] overflow-hidden  ">
            <ul className="list-none flex flex-col gap-4 p-4 h-[52vh] max-h-[100%] overflow-auto cursor-pointer ">
                {playlists.map(({ name, id }) => {
                    return (
                        <li
                            className="transition-all duration-300 ease-in-out hover:text-white"
                            key={id}
                            onClick={() => changeCurrentPlaylist(id)}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Playlists;
