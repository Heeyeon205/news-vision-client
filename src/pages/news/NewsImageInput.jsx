import { useState, useEffect, useRef } from "react";

export default function NewsImageInput({ image, setImage, infoImage }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const imageToShow = preview || image || infoImage;
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col">
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
      />
      <img
        src={imageToShow}
        alt="미리보기"
        width="530px"
        height="300px"
        className="w-full object-cover rounded cursor-pointer shadow-lg"
        onClick={handleImageClick}
      />
    </div>
  );
}
