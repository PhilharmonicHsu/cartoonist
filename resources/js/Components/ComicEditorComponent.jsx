import React, {useRef, useState, useEffect} from "react";
import Moveable from "react-moveable";
import axios from "axios";
import {router} from "@inertiajs/react";

export default function ComicEditorComponent({userComic}) {
    const [imageUrl, setImageUrl] = useState('');
    // const [dialogs, setDialogs] = useState([
    //     { id: 1, x: 100, y: 100, width: 200, height: 100, text: "Hello, this is a test dialog!"},
    // ]);

    const [dialogs, setDialogs] = useState([]);

    const [selectedDialogId, setSelectedDialogId] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setDialogs(userComic.dialog);
        setImageUrl(userComic.image_url);
    }, []);

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

    const handleSubmit = () => {
        const data = {
            dialogs,
        };

        axios.patch(`/api/user-comic/${userComic.id}`, data)
            .then(response => {
                console.log(response)
            })
            .catch((error) => {
                console.error("Failed to update comic data:", error);
            });

        router.visit('/');
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        >
            {/* 背景圖片 */}
            <img
                src={imageUrl}
                alt="Comic Background"
                className="w-full h-auto object-cover"
            />

            {/* 添加對話氣泡按鈕 */}
            <button
                onClick={handleSubmit}
                className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
                Submit
            </button>

            <button
                onClick={clearFocus}
                className="absolute top-4 left-28 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
            >
                Clear Focus
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
                        border: dialog.id === selectedDialogId ? "2px solid blue" : "2px solid black",
                        borderRadius: "15px",
                        padding: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        cursor: "move",
                    }}
                    onClick={(e) => setSelectedDialogId(dialog.id)}
                >
                    {/* 調整大小手柄 */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-10px",
                            right: "-10px",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            cursor: "se-resize",
                        }}
                    />
                    <textarea
                        value={dialog.text}
                        onChange={(e) =>
                            updateDialog(dialog.id, {text: e.target.value})
                        }
                        className="w-full h-full border-none outline-none resize-none bg-transparent text-xl font-medium text-gray-800"
                        style={{
                            fontFamily: "'Bangers', cursive", // 使用漫畫字體
                        }}
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
