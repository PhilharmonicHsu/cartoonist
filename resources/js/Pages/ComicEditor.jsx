import React from "react";
import ComicEditorComponent from "../Components/ComicEditorComponent.jsx";
export default function ComicEditor({userComic}) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center bg-[url('/images/comic-background.jpg')]">
            <ComicEditorComponent userComic={userComic} />
        </div>
    );
}
