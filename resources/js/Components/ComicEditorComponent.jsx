import React, {useRef, useState, useEffect} from "react";
import Moveable from "react-moveable";
import {router} from "@inertiajs/react";
import SimpleSpin from "@/Components/SimpleSpin.jsx";
import FullScreenLoader from "@/Components/FullScreenLoader.jsx";
import { updateUserComic } from "@/api/comicApi.js";

const DEFAULT_DIALOG = [
     { id: 1, x: 100, y: 100, width: 300, height: 150, text: "Hello, this is a default dialog!"},
];

export default function ComicEditorComponent({userComic}) {
    const [imageUrl, setImageUrl] = useState('');
    const [dialogs, setDialogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [adjustedDialogs, setAdjustedDialogs] = useState(dialogs);

    const [selectedDialogId, setSelectedDialogId] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setDialogs(userComic.dialogs || DEFAULT_DIALOG);
        setImageUrl(userComic.image_url);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const scaleFactor = width / 1440; // 假設原始設計寬度是 1920px

            console.log(scaleFactor)

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

    const updateDialog = (id, updater) => {
        setDialogs((prevDialogs) =>
            prevDialogs.map((dialog) =>
                dialog.id === id ? { ...dialog, ...updater(dialog) } : dialog
            )
        );
    };

    const handleDrag = ({ left, top }) => {
        updateDialog(selectedDialogId, () => ({
            x: left,
            y: top,
        }));
    };

    const handleResize = ({ width, height, delta, left, top }) => {
        const dialog = dialogs.find((d) => d.id === selectedDialogId);
        if (dialog) {
            // 檢查數值有效性，防止 NaN
            const newWidth = isNaN(width) ? dialog.width : width;
            const newHeight = isNaN(height) ? dialog.height : height;
            const newX = isNaN(left) ? dialog.x : left;
            const newY = isNaN(top) ? dialog.y : top;

            updateDialog(selectedDialogId, () => ({
                width: newWidth,
                height: newHeight,
                x: newX,
                y: newY,
            }));
        }
    };

    const clearFocus = () => {
        setSelectedDialogId(null);
    };

    const handleSubmit = async () => {
        const data = {
            dialogs,
        };

        setIsLoading(true);

        try {
            await updateUserComic(userComic.id, data);
        } catch (error) {
            console.error("Failed to update comic data:", error);
        } finally {
            setIsLoading(false);
        }

        router.visit('/');
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        >
            {isLoading && <FullScreenLoader context="Sending" />}
            <img
                src={imageUrl}
                alt="Comic Background"
                className="w-full max-h-screen object-cover"
            />

            <button
                onClick={handleSubmit}
                className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                disabled={isLoading}
            >
                {isLoading ? <SimpleSpin /> : 'Submit' }
            </button>

            <button
                onClick={clearFocus}
                className="absolute top-4 left-28 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                disabled={isLoading}
            >
                {isLoading ? <SimpleSpin /> : 'Clear Focus' }
            </button>

            {adjustedDialogs.map((dialog) => (
                <div
                    key={dialog.id}
                    id={`dialog-${dialog.id}`}
                    className="absolute bg-white p-2 rounded-2xl cursor-move shadow-md border-4 border-solid"
                    style={{
                        top: dialog.y,
                        left: dialog.x,
                        width: `${dialog.width}px`,
                        height: `${dialog.height}px`,
                        borderColor: dialog.id === selectedDialogId ? "blue" : "black",
                        transform: `scale(${dialog.scale || 1})`, // 應用縮放
                        transformOrigin: "top left", // 設置縮放原點
                    }}
                    onClick={() => setSelectedDialogId(dialog.id)}
                >
                    {/* 調整大小手柄 */}
                    <div
                        className="absolute bottom-[-10px] right-[-10px] w-[40px] h-[40px] bg-black/10 cursor-se-resize"

                    />
                    <textarea
                        value={dialog.text}
                        onChange={(e) =>
                            updateDialog(dialog.id, () => ({text: e.target.value}))
                        }
                        className="font-bangers w-full h-full border-none outline-none resize-none bg-transparent text-4xl font-medium text-gray-800"
                    />
                </div>
            ))}

            {/* Moveable 控制 */}
            {selectedDialogId && (
                <Moveable
                    target={document.getElementById(`dialog-${selectedDialogId}`)}
                    container={containerRef.current}
                    origin={false}
                    draggable={true}
                    resizable={true}
                    onDrag={({left, top}) => handleDrag({left, top})}
                    onResize={({width, height, left, top}) => handleResize({width, height, left, top})}
                    keepRatio={false}
                    throttleDrag={1}
                    throttleResize={1}
                    edge={false}
                />
            )}
        </div>
    );
}
