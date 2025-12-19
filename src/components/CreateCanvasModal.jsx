import { useState } from "react";
import { createCanvas } from "../api/canvasApi";
import { useNavigate } from "react-router-dom";

export default function CreateCanvasModal({ close }) {
  const [form, setForm] = useState({
    name: "",
    width: "",
    height: "",
  });
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.name || !form.width || !form.height) return;

    const res = await createCanvas(form);
    navigate(`/canvas/${res.data.data.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Create New Canvas
          </h3>
          <button
            onClick={close}
            className="text-gray-400 transition hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Canvas Name
            </label>
            <input
              type="text"
              placeholder="My Awesome Canvas"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Width (px)
              </label>
              <input
                type="number"
                placeholder="800"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setForm({ ...form, width: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Height (px)
              </label>
              <input
                type="number"
                placeholder="600"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setForm({ ...form, height: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 disabled:opacity-50"
            disabled={!form.name || !form.width || !form.height}
          >
            Create Canvas
          </button>
        </div>
      </div>
    </div>
  );
}
