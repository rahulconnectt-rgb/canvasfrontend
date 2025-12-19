import { useEffect, useState } from "react";
import { getAllCanvas } from "../api/canvasApi";
import CreateCanvasModal from "../components/CreateCanvasModal";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Home() {
  const [canvases, setCanvases] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCanvases = async () => {
    const res = await getAllCanvas();
    setCanvases(res.data.data);
  };

  useEffect(() => {
    fetchCanvases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            🎨 Canvas Builder
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Plus size={18} />
            Create New Canvas
          </button>
        </div>

        {/* Canvas Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {canvases.map((c) => (
            <div
              key={c._id}
              onClick={() => navigate(`/canvas/${c._id}`)}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                  {c.name}
                </h2>

                <span className="mt-4 inline-block text-sm font-medium text-indigo-500">
                  Open Canvas →
                </span>
              </div>
            </div>
          ))}

          {canvases.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No canvases yet. Create your first one 🚀
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && <CreateCanvasModal close={() => setOpen(false)} />}
    </div>
  );
}
