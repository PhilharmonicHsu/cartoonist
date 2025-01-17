import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable"; // 引入 Resizable 庫

export default function ComicDialogDraggableScreen({ imageUrl }) {
    // 對話氣泡初始數據
    const [dialogs, setDialogs] = useState([
        { id: 1, x: 0, y: 0, width: 200, height: 100, text: "Hello, this is a test dialog!"},
    ]);

    const [isHovered, setIsHovered] = useState(false);

    // 新增對話氣泡
    const addDialog = () => {
        const newDialog = {
            id: dialogs.length + 1,
            x: 50,
            y: 50,
            width: 200,
            height: 100,
            text: "New dialog",
        };
        setDialogs([...dialogs, newDialog]);
    };

    // 更新對話位置
    const updateDialogPosition = (id, x, y) => {
        setDialogs((prevDialogs) =>
            prevDialogs.map((dialog) =>
                dialog.id === id ? { ...dialog, x, y } : dialog
            )
        );
    };

    // 更新對話文字
    const updateDialogText = (id, newText) => {
        setDialogs((prevDialogs) =>
            prevDialogs.map((dialog) =>
                dialog.id === id ? { ...dialog, text: newText } : dialog
            )
        );
    };

    // 更新氣泡大小
    const updateDialogSize = (id, newWidth, newHeight) => {
        setDialogs((prevDialogs) =>
            prevDialogs.map((dialog) =>
                dialog.id === id ? { ...dialog, width: newWidth, height: newHeight } : dialog
            )
        );
    };

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "800px" }}>
            {/* 背景圖片 */}
            <img
                src={imageUrl}
                alt="Comic Background"
                style={{ width: "100%", display: "block" }}
            />

            {/* 新增氣泡按鈕 */}
            <button
                onClick={addDialog}
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 10,
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                }}
            >
                Add Dialog
            </button>

            {/* 可拖拽和調整大小的對話氣泡 */}
            {dialogs.map((dialog) => (
                <Draggable
                    key={dialog.id}
                    position={{ x: dialog.x, y: dialog.y }}
                    onStop={(e, data) => updateDialogPosition(dialog.id, data.x, data.y)}
                    handle=".draggable-handle" // 僅限拖拽手柄
                >
                    <Resizable
                        size={{ width: dialog.width, height: dialog.height }}
                        onResizeStop={(e, direction, ref, d) => {
                            updateDialogSize(dialog.id, dialog.width + d.width, dialog.height + d.height);
                        }}
                        className="absolute bg-color-white border-2 border-solid border-black rounded-2xl cursor-move overflow-hidden"
                    >
                        {/* 拖拽手柄 */}
                        <div
                            style={{
                                backgroundColor: isHovered ? "gray" : "white",
                            }}
                            className="draggable-handle w-full h-4 cursor-move absolute bottom-0"
                        ></div>
                        {/* 編輯文字區域 */}
                        <textarea
                            value={dialog.text}
                            onChange={(e) => updateDialogText(dialog.id, e.target.value)}
                            onFocus={() => setIsHovered(true)}
                            onBlur={() => setIsHovered(false)}
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                outline: "none",
                                resize: "none",
                                padding: "10px",
                                fontSize: "14px",
                                fontFamily: "Arial, sans-serif",
                            }}
                        />
                    </Resizable>
                </Draggable>
            ))}
        </div>
    );
}
