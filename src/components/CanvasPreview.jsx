import { useRef, useEffect } from "react";
import {
  addRectangle,
  addCircle,
  addText,
  addImage,
} from "../api/canvasApi";
import { TOOLS } from "../constants/tools";

export default function CanvasPreview({
  canvas,
  tool,
  canvasId,
  image,
  clearImage,
  refresh,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const ctx = canvasEl.getContext("2d");

    canvasEl.width = canvas.width;
    canvasEl.height = canvas.height;

    // Clear background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    const drawElements = async () => {
      for (const el of canvas.elements) {
        if (el.type === "rectangle") {
          ctx.fillStyle = el.color;
          ctx.fillRect(el.x, el.y, el.width, el.height);
        }

        if (el.type === "circle") {
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.fillStyle = el.color;
          ctx.fill();
        }

        if (el.type === "text") {
          ctx.font = `${el.fontSize}px ${el.fontFamily || "Arial"}`;
          ctx.fillStyle = el.color;
          ctx.fillText(el.text, el.x, el.y);
        }

        if (el.type === "image") {
          const img = new Image();
          img.src = `http://localhost:5000/${el.imageUrl}`;

          await new Promise((resolve) => {
            img.onload = () => {
              ctx.drawImage(img, el.x, el.y, el.width, el.height);
              resolve();
            };
          });
        }
      }
    };

    drawElements();
  }, [canvas]);

  const handleClick = async (e) => {
    if (!tool) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    if (tool === TOOLS.RECTANGLE) {
      await addRectangle(canvasId, {
        x,
        y,
        width: 100,
        height: 80,
        color: "#000000",
      });
    }

    if (tool === TOOLS.CIRCLE) {
      await addCircle(canvasId, {
        x,
        y,
        radius: 40,
        color: "#000000",
      });
    }

    if (tool === TOOLS.TEXT) {
      await addText(canvasId, {
        x,
        y,
        text: "Text",
        fontSize: 16,
        color: "#000000",
      });
    }

    if (tool === TOOLS.IMAGE && image) {
      const fd = new FormData();
      fd.append("image", image);
      fd.append("x", x);
      fd.append("y", y);

      await addImage(canvasId, fd);
      clearImage();
    }

    refresh();
  };

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] p-8">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className={`
          rounded-lg border bg-white shadow-xl
          ${tool ? "cursor-crosshair" : "cursor-default"}
        `}
      />
    </div>
  );
}
