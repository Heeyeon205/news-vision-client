import { useRef, useState } from "react";

export default function ProfileImageInput({ image, setImage }) {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
      />
      <img
        src={preview || image}
        alt="프로필 미리보기"
        onClick={handleClickImage}
        className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-80"
      />
    </div>
  );
}
