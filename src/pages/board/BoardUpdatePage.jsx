import { useLocation } from "react-router-dom";
import apiClient from "../../api/axios";
import { useState, useEffect } from "react";
import BoardImageInput from "./BoardImageInput";
import BoardUpdateSubmit from "./BoardUpdateSubmit";
import CategoriesInput from "../../utils/CategoriesInput";

export default function BoardUpdatePage() {
  const location = useLocation();
  const { boardId } = location.state;

  const [image, setImage] = useState("");
  const [selectId, setSelectId] = useState(0);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiClient.get(`/api/board/update/${boardId}`);
        const result = res.data;
        setImage(result.data.image);
        setCategories(result.data.categories);
        setUserImage(result.data.userImage);
        setSelectId(result.data.categoryId);
        setNickname(result.data.nickname);
        setContent(result.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [boardId]);

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col gap-4">
      {/* 프로필 + 작성자 정보 */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          alt="프로필"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-sm text-gray-700 font-medium">{nickname}</p>
      </div>

      {/* 카테고리 선택 */}
      <div>
        <CategoriesInput
          categories={categories}
          selectId={selectId}
          setSelectId={setSelectId}
        />
      </div>

      {/* 텍스트 입력창 */}
      <textarea
        placeholder={`${nickname}님의 생각을 나누며 지식을 넓혀보세요`}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        rows={7}
        maxLength={299}
        className="w-full border border-gray-300 p-3 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 h-72"
      />
      <div className="text-right text-xs text-gray-400 mt-1">
        {content.length}/300
      </div>

      {/* 이미지 업로드 및 수정 버튼 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <BoardImageInput image={image} setImage={setImage} />
        <BoardUpdateSubmit
          boardId={boardId}
          image={image}
          content={content}
          categoryId={selectId}
        />
      </div>
    </div>
  );
}
