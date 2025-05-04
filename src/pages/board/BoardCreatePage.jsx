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
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-4 mr-4 mt-6">
      <div>
        <select
          className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={(e) => setSelectId(e.target.value)}
          value={selecteId}
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start gap-3 mt-5">
        <img
          src={logProfile}
          alt="프로필 이미지"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            className="w-full break-words border border-gray-300 p-3 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 h-72"
            rows={7}
            maxLength={300}
            value={content}
            onChange={(e) => {
              const trimmed = e.target.value.slice(0, 300);
              setContent(trimmed);
            }}
            placeholder={`${logNickname}님의 생각을 나누며 지식을 넓혀보세요`}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {content.length}/300
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-3">
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
