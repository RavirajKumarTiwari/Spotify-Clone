import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function Body({ headerBackground }) {
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
        useStateProvider();

    useEffect(() => {
        const getInitilaPlaylist = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log(response);

            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a")
                    ? ""
                    : response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2]
                        ? track.album.images[2].url
                        : "#",
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_url: track.album.uri,
                    track_number: track.track_number,
                })),
            };
            // console.log(selectedPlaylist);
            // console.log(response.data);
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
        };
        getInitilaPlaylist();
    }, [token, dispatch, selectedPlaylistId]);

    // convert mili second to minute
    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const playTrack = async (
        id,
        name,
        artists,
        image,
        context_uri,
        track_number
    ) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                context_uri,
                offset: {
                    position: track_number - 1,
                },
                position_ms: 0,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status === 204) {
            const currentlyPlaying = {
                id,
                name,
                artists,
                image,
            };
            dispatch({ type: reducerCases.SET_PLAYING.currentlyPlaying });
            dispatch({
                type: reducerCases.SET_PLAYER_STATE,
                playerState: true,
            });
        } else {
            dispatch({
                type: reducerCases.SET_PLAYER_STATE,
                playerState: true,
            });
        }
    };

    return (
        <Container className="container" headerBackground={headerBackground}>
            {selectedPlaylist && (
                <>
                    <div className="playlist my-0 mx-8 flex items-center gap-8">
                        <div className="image h-[15rem] shadow-imageShadow ">
                            <img
                                src={selectedPlaylist.image}
                                alt="selected_playlist"
                            />
                        </div>
                        <div className="details flex flex-col gap-4 text-[#e0dede] ">
                            <span className="type">PLAYLIST</span>
                            <h1 className="title text-white text-[4rem] font-bold ">
                                {selectedPlaylist.name}
                            </h1>
                            <p className="description">
                                {selectedPlaylist.description}
                            </p>
                        </div>
                    </div>
                    <div className="list">
                        <div
                            className={`header_row grid sticky mt-4 mb-0 mr-0 ml-0 top-[15vh] py-4 px-12 transition-all duration-300 ease-in-out ${
                                headerBackground
                                    ? "bg-[#000000dc] bg-opacity-70"
                                    : "bg-transparent"
                            }`}
                        >
                            <div className="col flex items-center text-[#dddcdc] font-bold">
                                <span>#</span>
                            </div>
                            <div className="col flex items-center text-[#dddcdc] font-bold">
                                <span>Title</span>
                            </div>
                            <div className="col flex items-center text-[#dddcdc] font-bold">
                                <span>Album</span>
                            </div>
                            <div className="col flex items-center text-[#dddcdc] font-bold">
                                <span>
                                    <AiFillClockCircle />
                                </span>
                            </div>
                        </div>
                        <div className="tracks my-0 mx-8 flex flex-col mb-20 ">
                            {selectedPlaylist.tracks.map(
                                (
                                    {
                                        id,
                                        name,
                                        artists,
                                        image,
                                        duration,
                                        album,
                                        context_uri,
                                        track_number,
                                    },
                                    index
                                ) => {
                                    return (
                                        <div
                                            className="row py-2 px-4 grid grid-cols-4 hover:bg-[#00000069] "
                                            key={id}
                                            onClick={() =>
                                                playTrack(
                                                    id,
                                                    name,
                                                    artists,
                                                    image,
                                                    context_uri,
                                                    track_number
                                                )
                                            }
                                        >
                                            <div className="col flex items-center text-[#dddcdc] ">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="col detail flex gap-4 items-center text-[#dddcdc]">
                                                <div className="image">
                                                    <img
                                                        className="h-[40px]"
                                                        src={image}
                                                        alt="track_image"
                                                    />
                                                </div>

                                                <div className="info flex flex-col ">
                                                    <span>{name}</span>
                                                    <span>{artists}</span>
                                                </div>
                                            </div>
                                            <div className="col flex items-center text-[#dddcdc]">
                                                <span>{album}</span>
                                            </div>
                                            <div className="col flex items-center text-[#dddcdc]">
                                                <span>
                                                    {msToMinutesAndSeconds(
                                                        duration
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Body;

const Container = styled.div`
    .header_row {
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
    }
    .row {
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
    }
`;
