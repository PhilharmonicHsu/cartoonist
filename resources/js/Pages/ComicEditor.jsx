import React from "react";
import ComicEditorScreen from "../Components/ComicEditorScreen.jsx";
export default function ComicEditor() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center bg-[url('images/comic-background.jpg')]">
            <ComicEditorScreen imageUrl="https://mcphils.s3.us-east-2.amazonaws.com/images/CdTUhjSKQpwQEwLeHDx70I6Ty2JUrgIxceEehGZG.jpg"/>
        </div>
    );
}
