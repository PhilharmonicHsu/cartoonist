import React, { useState, useEffect } from "react";
import axios from "axios";
import {getStyleById} from "@/utils/common.js";

export default function LibraryComponent() {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 模擬從 API 獲取漫畫列表
        axios.get("/api/user-comics")
            .then((response) => {
                setComics(response.data); // 假設 API 返回漫畫列表
            })
            .catch((error) => {
                console.error("Failed to fetch comics:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center pt-8 bg-amber-100">
            {/* 頁面標題 */}
            {/* 動態標題 */}
            <h1
                className="relative my-10 inline-block text-4xl font-bold text-gray-800 bg-gradient-to-r from-yellow-500 via-red-400 to-pink-500 bg-clip-text tracking-widest hover:scale-105 hover:text-red-500 transition-all duration-500"
                style={{
                    fontFamily: "'Bangers', cursive", // 使用漫畫字體
                }}
            >
                <span className="inline-block animate-bounce delay-100">C</span>
                <span className="inline-block animate-bounce delay-200">o</span>
                <span className="inline-block animate-bounce delay-300">m</span>
                <span className="inline-block animate-bounce delay-400">i</span>
                <span className="inline-block animate-bounce delay-500">c</span>
                <span className="inline-block animate-bounce delay-600">s</span>
                <span className="inline-block animate-bounce delay-700">&nbsp;</span>
                <span className="inline-block animate-bounce delay-100">G</span>
                <span className="inline-block animate-bounce delay-300">a</span>
                <span className="inline-block animate-bounce delay-500">l</span>
                <span className="inline-block animate-bounce delay-400">l</span>
                <span className="inline-block animate-bounce delay-200">e</span>
                <span className="inline-block animate-bounce delay-200">r</span>
                <span className="inline-block animate-bounce delay-100">y</span>
            </h1>
            {/* 漫畫卡片區域 */}
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {comics.map((comic) => (
                    <div
                        key={comic.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform hover:z-10 hover:ring-4 hover:ring-amber-500 cursor-pointer"
                        onClick={() => window.location.href = `/comic-showroom/${comic.id}`}
                    >
                        {/* 縮略圖 */}
                        <div className="relative">
                            <img
                                src={comic.image_url}
                                alt={comic.dialog[0].text}
                                className="w-full h-48 object-cover"
                            />
                            {/* 手繪風格邊框效果 */}
                            <div className="absolute inset-0 border-4 border-dotted border-amber-500 pointer-events-none"></div>
                        </div>

                        {/* 卡片內容 */}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{getStyleById(comic.style)}</h2>
                            <p className="text-gray-600"
                               style={{
                                    fontFamily: "'Bangers', cursive", // 使用漫畫字體
                               }}
                            >{comic.dialog[0].text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="w-full bg-gray-800 text-white py-4 mt-8 mb-20">
                <div className="max-w-6xl mx-auto text-center">
                    <p>&copy; 2025 Cartoonist. All rights reserved.</p>
                    <p>Powered by Your Creative Team</p>
                </div>
            </footer>

            {/* 新增漫畫按鈕 */}
            <button
                onClick={() => window.location.href = '/author-input'}
                className="fixed bottom-0 left-0 w-full bg-gradient-to-b from-amber-100 to-amber-700 h-20 text-white text-3xl font-bold py-4 flex items-center justify-center focus:outline-none hover:scale-105 hover:shadow-lg z-50 hover:scale-105 hover:text-red-500 transition-all duration-500"
                style={{
                    fontFamily: "'Bangers', cursive", // 使用漫畫字體
                }}
            >
                <span className="relative">
                    <span className="inline-block animate-bounce delay-100">C</span>
                    <span className="inline-block animate-bounce delay-300">r</span>
                    <span className="inline-block animate-bounce delay-500">e</span>
                    <span className="inline-block animate-bounce delay-700">a</span>
                    <span className="inline-block animate-bounce delay-200">t</span>
                    <span className="inline-block animate-bounce delay-400">e</span>
                    <span className="inline-block animate-bounce delay-600">&nbsp;</span>
                    <span className="inline-block animate-bounce delay-500">a</span>
                    <span className="inline-block animate-bounce delay-300">&nbsp;</span>
                    <span className="inline-block animate-bounce delay-100">N</span>
                    <span className="inline-block animate-bounce delay-600">e</span>
                    <span className="inline-block animate-bounce delay-400">w</span>
                    <span className="inline-block animate-bounce delay-400">&nbsp;</span>
                    <span className="inline-block animate-bounce delay-200">C</span>
                    <span className="inline-block animate-bounce delay-100">o</span>
                    <span className="inline-block animate-bounce delay-300">m</span>
                    <span className="inline-block animate-bounce delay-200">i</span>
                    <span className="inline-block animate-bounce delay-100">C</span>
                </span>
            </button>
        </div>
    );
}
