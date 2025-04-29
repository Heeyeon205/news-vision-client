import { useState } from "react";

export default function BoardImageInput({ image, setImage }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <p>이미지</p>
      <input
        className="border"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {preview ? (
        <img src={preview} alt="미리보기" width="40px" height="40px" />
      ) : (
        <img src={image} alt="미리보기" width="40px" height="40px" />
      )}
    </>
  );
}
