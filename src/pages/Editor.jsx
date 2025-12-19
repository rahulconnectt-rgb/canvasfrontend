import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCanvas, exportPDF } from "../api/canvasApi";
import Toolbar from "../components/Toolbar";
import CanvasPreview from "../components/CanvasPreview";
import { Download } from "lucide-react";

export default function Editor() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);
  const [tool, setTool] = useState(null);
  const [image, setImage] = useState(null);

  const fetchCanvas = async () => {
    const res = await getCanvas(id);
    setCanvas(res.data.data);
  };

  useEffect(() => {
    fetchCanvas();
  }, []);

  if (!canvas) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading canvas...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Toolbar */}
      <aside className="w-64 border-r border-gray-200 bg-white">
        <Toolbar setTool={setTool} setImage={setImage} />
      </aside>

      {/* Right Editor Area */}
      <main className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b bg-white px-6 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Canvas Editor</h2>

          <button
            onClick={() => exportPDF(id)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>

        {/* Canvas Preview */}
        <div className="flex flex-1 items-center justify-center overflow-auto p-6">
          <CanvasPreview
            canvas={canvas}
            tool={tool}
            canvasId={id}
            image={image}
            clearImage={() => setImage(null)}
            refresh={fetchCanvas}
          />
        </div>
      </main>
    </div>
  );
}
