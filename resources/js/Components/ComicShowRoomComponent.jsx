import React, { useState, useEffect } from "react";
import {router} from "@inertiajs/react";

export default function ComicShowRoomComponent({userComic}) {
    const [imageUrl, setImageUrl] = useState('');
    const [dialogs, setDialogs] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('comicId');

    useEffect(() => {
        setDialogs(userComic.dialog);
        setImageUrl(userComic.image_url);
    }, []);

    const handleBack = () => {
        router.visit('/')
    };

    return (
        <div
            className="relative w-full max-w-4xl mx-auto mt-0 bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        >
            <img
                src={imageUrl}
                alt="Comic Background"
                className="w-full max-h-screen object-cover"
            />

            <button
                onClick={handleBack}
                className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
                Back To Library
            </button>

            {/* 渲染對話氣泡 */}
            {dialogs.map((dialog) => (
                <div
                    key={dialog.id}
                    id={`dialog-${dialog.id}`}
                    style={{
                        position: "absolute",
                        top: dialog.y,
                        left: dialog.x,
                        width: `${dialog.width}px`,
                        height: `${dialog.height}px`,
                        background: "white",
                        border: "2px solid black",
                        borderRadius: "15px",
                        padding: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        cursor: "move",
                    }}
                >
                    <textarea
                        value={dialog.text}
                        className="w-full h-full border-none outline-none resize-none bg-transparent text-xl font-medium text-gray-800"
                        style={{
                            fontFamily: "'Bangers', cursive",
                        }}
                        disabled={true}
                    />
                </div>
            ))}
        </div>
    );
}
