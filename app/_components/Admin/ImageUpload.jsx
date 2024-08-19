// components/ImageUpload.jsx

import { useState } from 'react';

export default function ImageUpload({ selectedImages, setSelectedImages }) {
  // const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.map((file) => ({
      file,
      src: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...imageFiles]);
    // onUpload(imageFiles);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-2"
      />
      {/* <div className="mt-2 grid grid-cols-3 gap-2">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.preview} alt={`preview-${index}`} className="w-full h-24 object-cover" />
          </div>
        ))}
      </div> */}
    </div>
  );
}
