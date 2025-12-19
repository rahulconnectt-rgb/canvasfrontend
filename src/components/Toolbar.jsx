import { TOOLS } from "../constants/tools";
import {
  Square,
  Circle as CircleIcon,
  Type,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";

export default function Toolbar({ setTool, setImage }) {
  const [active, setActive] = useState(null);

  const toolBtn =
    "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition";

  const activeStyle =
    "bg-indigo-600 text-white shadow";

  const idleStyle =
    "text-gray-700 hover:bg-gray-100";

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Tools
      </h3>

      {/* Rectangle */}
      <button
        onClick={() => {
          setTool(TOOLS.RECTANGLE);
          setActive(TOOLS.RECTANGLE);
        }}
        className={`${toolBtn} ${
          active === TOOLS.RECTANGLE ? activeStyle : idleStyle
        }`}
      >
        <Square size={18} />
        Rectangle
      </button>

      {/* Circle */}
      <button
        onClick={() => {
          setTool(TOOLS.CIRCLE);
          setActive(TOOLS.CIRCLE);
        }}
        className={`${toolBtn} ${
          active === TOOLS.CIRCLE ? activeStyle : idleStyle
        }`}
      >
        <CircleIcon size={18} />
        Circle
      </button>

      {/* Text */}
      <button
        onClick={() => {
          setTool(TOOLS.TEXT);
          setActive(TOOLS.TEXT);
        }}
        className={`${toolBtn} ${
          active === TOOLS.TEXT ? activeStyle : idleStyle
        }`}
      >
        <Type size={18} />
        Text
      </button>

      {/* Image Upload */}
      <label
        className={`${toolBtn} cursor-pointer ${idleStyle}`}
      >
        <ImageIcon size={18} />
        Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setTool(TOOLS.IMAGE);
            setActive(TOOLS.IMAGE);
          }}
        />
      </label>
    </div>
  );
}
