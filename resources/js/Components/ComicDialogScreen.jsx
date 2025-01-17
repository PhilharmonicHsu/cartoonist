import React, { useRef, useEffect } from "react";

export default function ComicDialogScreen({ imageUrl, dialogs }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // 加載漫畫背景圖片
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            // 設置 Canvas 尺寸
            canvas.width = img.width;
            canvas.height = img.height;

            // 繪製背景
            ctx.drawImage(img, 0, 0);

            // 渲染對話氣泡和文字
            dialogs.forEach((dialog) => {
                drawDialogBubble(ctx, dialog);
            });
        };
    }, [imageUrl, dialogs]);

    const drawDialogBubble = (ctx, dialog) => {
        const { x, y, width, height, text } = dialog;

        // 繪製氣泡
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, 15); // 圓角矩形
        ctx.fill();
        ctx.stroke();

        // 繪製文字
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        const lines = wrapText(ctx, text, width - 20);
        lines.forEach((line, index) => {
            ctx.fillText(line, x + 10, y + 25 + index * 20); // 每行高度 20px
        });
    };

    const wrapText = (ctx, text, maxWidth) => {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        words.forEach((word) => {
            const testLine = currentLine + word + " ";
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = word + " ";
            } else {
                currentLine = testLine;
            }
        });

        lines.push(currentLine.trim());
        return lines;
    };

    return <canvas ref={canvasRef} style={{ border: "1px solid #000", width: "100%" }} />;
}
