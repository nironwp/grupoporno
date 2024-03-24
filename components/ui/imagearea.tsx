/* eslint-disable @next/next/no-img-element */
// components/ImageArea.server.tsx

import { ChangeEvent } from "react";

interface ImageAreaProps {
  className?: string;
  change?: (file: File | null) => void;
}

export default function ImageArea({ className, change }: ImageAreaProps) {
  let image :File | null =null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      image  = file;
      if (change) {
        change(file);
      }
    }
  };

  const handleRemoveImage = () => {
    image = null;
    if (change) {
      change(null);
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {image ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="block w-full h-auto rounded-md"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-md"
          >
            Remover
          </button>
        </div>
      ) : (
        <label className="w-full h-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      )}
    </div>
  );
}
