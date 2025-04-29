import { useStore } from "../../store/useUserStore";
import { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import BoardCreateSubmit from "./BoardCreateSubmit";
import BoardImageInput from "./BoardImageInput";

export default function BoardCreatePage() {
  const logNickname = useStore((state) => state.nickname);
  const logProfile = useStore((state) => state.image);
  const [selecteId, setSelectId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.get("/api/category");
        const result = response.data;
        console.log(result.data);
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="boardBox">
      <div className="categoryBox">
        <select
          className="border"
          onChange={(e) => setSelectId(e.target.value)}
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <img src={logProfile} alt="프로필이미지" />
      <textarea
        placeholder={`${logNickname}님의 생각을 나누며 지식을 넓혀보세요`}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div>
        <BoardImageInput image={image} setImage={setImage} />
        <BoardCreateSubmit
          image={image}
          content={content}
          categoryId={selecteId}
        />
      </div>
    </div>
  );
}
