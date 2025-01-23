import React from "react";

export default function Footer({hasMargin}) {
    const className = hasMargin
        ? 'w-full bg-gray-800 text-white py-4 mb-20'
        : 'w-full bg-gray-800 text-white py-4'

    return <footer className={className}>
        <div className="max-w-6xl mx-auto text-center">
            <p>&copy; 2025 Cartoonist. All rights reserved.</p>
            <p>Powered by Phil</p>
        </div>
    </footer>
}
