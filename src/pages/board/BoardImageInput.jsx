import { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";

export default function BoardImageInput({ image, setImage }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-center gap-3">
      {/* 아이콘 클릭 시 파일 업로드 */}
      <label
        htmlFor="image-upload"
        className="cursor-pointer text-2xl text-orange-500 hover:text-orange-600"
      >
        <IoImagesOutline />
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* 이미지 미리보기 */}
      {(preview || image) && (
        <img
          src={preview || (typeof image === "string" ? image : URL.createObjectURL(image))}
          alt="미리보기"
          className="w-10 h-10 object-cover border rounded"
        />
      )}
    </div>
  );
}
