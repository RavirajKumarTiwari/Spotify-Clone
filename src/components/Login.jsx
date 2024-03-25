import React from "react";
// import styled from "styled-components";

export default function Login() {
  const handleClick = () => {
      // alert("You are being redirected to Spotify for authentication");
    const clientId = "958fd7053c6148edb9b851a3d22bf381";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scopes = ["user-read-email", "user-read-private", 
    "user-read-playback-state",
    "user-modify-playback-state",
      "user-read-currently-playing",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played"
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(" ")}&response_type=token&show_dialog=true`;
    };
    return (
        <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-black text-white gap-[5rem]">
            <img
                className="h-[20vh]"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                alt="Spotify_logo"
            />
        <button
          onClick={handleClick}
          className="p-4 px-20 bg-[#1DB954] text-black rounded-[5rem] text-2xl cursor-pointer"
        >
                Connect Spotify
            </button>
        </div>
    );
}

// const Container = styled.div``;
