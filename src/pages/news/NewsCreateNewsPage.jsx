import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import NewsImageInput from "./NewsImageInput";
import { toast } from "sonner";

export default function NewsCreateNewsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectId, setSelectId] = useState("");
  const { referenceTitle, referencePubDate, referenceLink } = location.state;

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await apiClient.get("/api/category");
        const result = response.data;
        console.log(result.data);
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategory();
  }, []);

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("categoryId", selectId);
      formData.append("naverTitle", referenceTitle);
      formData.append("naverLink", referenceLink);
      formData.append("naverPubDate", referencePubDate);
      await apiClient.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("뉴스 작성 완료");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newsContainer">
      <div className="referenceBox border">
        <h3>{referenceTitle}</h3>
        <p>{referencePubDate}</p>
        <a href={referenceLink}>뉴스 확인하러 가기</a>
      </div>

      <select className="border" onChange={(e) => setSelectId(e.target.value)}>
        <option value="">카테고리를 선택하세요</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="newsBox">
        <NewsImageInput image={image} setImage={setImage} />
        <input
          type="text"
          placeholder="제목을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="본문을 입력하세요"
          defaultValue={""}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button className="border" onClick={handleClick}>
          작성 완료
        </button>
      </div>
    </div>
  );
}
