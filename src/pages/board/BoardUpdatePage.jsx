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
        console.log("result.data : ", result.data);
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
    <div className="boardBox">
      <div className="categoryBox">
        <CategoriesInput
          categories={categories}
          selectId={selectId}
          setSelectId={setSelectId}
        />
      </div>
      <img src={userImage} alt="프로필이미지" />
      <textarea
        placeholder={`${nickname}님의 생각을 나누며 지식을 넓혀보세요`}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <div>
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
