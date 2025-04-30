import { useState, useRef } from "react";


export default function NewsImageInput({ image, setImage }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); //명보가 추가

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col">
      {/* <p className="mb-2 font-bold text-gray-800">이미지</p> */}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef} // 명보가 추가
      />

      {preview ? (
        <img src={preview} alt="미리보기" width="530px" height="300px" className="w-full object-cover rounded cursor-pointer shadow-lg" onClick={handleImageClick} />
      ) : (
        <img src={image} alt="미리보기" width="530px" height="300px" className="w-full object-cover rounded cursor-pointer shadow-lg" onClick={handleImageClick} />
      )}
    </div>
  );
}
