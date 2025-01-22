import React, { useState } from 'react';
import { router } from '@inertiajs/react'

export default function AuthorInputComponent() {
    const [storySummary, setStorySummary] = useState('');
    const [characterSetting, setCharacterSetting] = useState('');
    const [styleId, setStyleId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // 成功訊息

    const styles = [
        { id: 1, name: 'Japanese', image: '/images/japanese-style.jpg' },
        { id: 2, name: 'Western', image: '/images/western-style.jpg' },
        { id: 3, name: 'Fantasy', image: '/images/fantasy-style.jpg' },
        { id: 4, name: 'Doomsday', image: '/images/doomsday-style.jpg' },
    ];

    const handleSubmit = async () => {
        if (!storySummary || !characterSetting || !styleId) {
            alert('Please fill in all fields and select a style.')

            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/generate-image', {
                storySummary,
                characterSetting,
                styleId,
            })

            if (response.status === 200) {
                console.log(response.data)

                router.visit(`/comic-editor/${response.data.id}`)

                return;
            }

            alert('Failed to start image generation. Please try again later.')
            console.log(response)
        } catch (error) {
            alert('Failed to start image generation. Please try again later.')
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
            {/* 背景模擬書桌 */}
            <div className="absolute inset-0 bg-cover bg-center"
                 style={{backgroundImage: 'url(/images/desk-background.jpg)'}}/>

            {/* 主容器 */}
            <div
                className="relative z-10 bg-white shadow-xl rounded-xl flex flex-col space-y-6 lg:space-y-0 lg:space-x-8 w-4/5 max-w-7xl">
                <div
                    className="relative w-full z-10 px-8 pt-8 pb-2 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 max-w-7xl"
                >
                    {/* 左側：輸入區 */}
                    <div className="w-full lg:w-2/3 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Story creation</h2>

                        {/* 故事概述 */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Story Summary</label>
                            <textarea
                                className="mt-2 block w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Please describe your story in summary..."
                                value={storySummary}
                                onChange={(e) => setStorySummary(e.target.value)}
                            />
                        </div>

                        {/* 角色設定 */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Character setting</label>
                            <textarea
                                className="mt-2 block w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Please describe the character's personality and appearance..."
                                value={characterSetting}
                                onChange={(e) => setCharacterSetting(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 右側：風格選擇區 */}
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-2xl font-bold text-gray-800">Choose style</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {styles.map((style) => (
                                <button
                                    key={style.id}
                                    className={`p-4 border rounded-lg shadow-sm hover:shadow-md focus:outline-none ${
                                        styleId === style.id ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                    onClick={() => setStyleId(style.id)}
                                >
                                    <img src={style.image} alt={style.name}
                                         className="rounded-md w-full lg:h-24 h-48 object-cover"/>
                                    <p className="text-center mt-2 text-lg font-medium text-gray-700">{style.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative z-10 bg-white text-center">
                    <button className="rounded-xl py-2 px-4 my-4 bg-amber-300 w-1/2 font-bold text-white"
                            onClick={handleSubmit}
                    >Submit</button>
                </div>
            </div>
        </div>
    );
}
