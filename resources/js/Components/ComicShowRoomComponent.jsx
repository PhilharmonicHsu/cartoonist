import React, { useState, useEffect } from "react";
import {router} from "@inertiajs/react";

export default function ComicShowRoomComponent({userComic}) {
    const [imageUrl, setImageUrl] = useState('');
    const [dialogs, setDialogs] = useState([]);
    const [adjustedDialogs, setAdjustedDialogs] = useState(dialogs);

    useEffect(() => {
        setDialogs(userComic.dialogs);
        setImageUrl(userComic.image_url);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const scaleFactor = width / 1440; // 假設原始設計寬度是 1920px

            setAdjustedDialogs(
                dialogs.map((dialog) => ({
                    ...dialog,
                    scale: scaleFactor.toFixed(2).toString(),
                }))
            );
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // 初始化調整

        return () => window.removeEventListener("resize", handleResize);
    }, [dialogs]);

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
            {adjustedDialogs.map((dialog) => (
                <div
                    key={dialog.id}
                    id={`dialog-${dialog.id}`}
                    className="absolute bg-white p-2 rounded-2xl cursor-move shadow-md border-4 border-solid border-black"
                    style={{
                        top: dialog.y,
                        left: dialog.x,
                        width: `${dialog.width}px`,
                        height: `${dialog.height}px`,
                        transform: `scale(${dialog.scale || 1})`, // 應用縮放
                        transformOrigin: "top left", // 設置縮放原點
                    }}
                >
                    <textarea
                        value={dialog.text}
                        className="font-bangers w-full h-full border-none outline-none resize-none bg-transparent text-4xl font-medium text-gray-800"
                        disabled={true}
                    />
                </div>
            ))}
        </div>
    );
}
