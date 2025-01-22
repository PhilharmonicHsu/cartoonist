import React from "react";
import ComicShowRoomComponent from "../Components/ComicShowRoomComponent.jsx";
export default function ComicShowRoom({userComic}) {
    return (
        <div
            className="min-h-screen bg-gray-50 flex items-center justify-center bg-[url('/images/comic-background.jpg')]">
            <ComicShowRoomComponent userComic={userComic}/>
        </div>
    );
}
