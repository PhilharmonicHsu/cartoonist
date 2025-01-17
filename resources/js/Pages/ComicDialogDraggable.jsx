import React from 'react';
import ComicDialogDraggableScreen from '../components/ComicDialogDraggableScreen.jsx';

export default function ComicDialogDraggable() {


// 測試用例
    const dialogs = [
        { x: 50, y: 50, width: 200, height: 100, text: "Hello, this is a test dialog!" },
        { x: 300, y: 150, width: 200, height: 100, text: "Another dialog for testing." },
    ];


    return (
        <div>
            <ComicDialogDraggableScreen
                imageUrl="https://mcphils.s3.us-east-2.amazonaws.com/images/CdTUhjSKQpwQEwLeHDx70I6Ty2JUrgIxceEehGZG.jpg"
            />
        </div>
    );
}
