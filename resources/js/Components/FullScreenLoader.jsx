import React from "react";
import { GridLoader } from "react-spinners";

export default function FullScreenLoader({context}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
            <h2 className="text-amber-500 text-3xl animate-bounce mb-4"
                style={{
                    fontFamily: "'Bangers', cursive", // 使用漫畫字體
                }}
            >
                {context}
            </h2>
            <GridLoader
                color="#F59E0C" // 加載器顏色
                size={20}      // 加載器大小
                speedMultiplier={1} // 動畫速度倍率
            />
        </div>
    );
}
