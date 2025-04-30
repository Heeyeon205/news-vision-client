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
    <div className="p-4 max-w-[600px] w-full mx-auto min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{referenceTitle}</h3>
        <p className="text-sm text-gray-500 mb-4">{referencePubDate}</p>
        <a href={referenceLink} className="text-orange-500 text-sm font-medium hover:underline">뉴스 확인하러 가기</a>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-10" onChange={(e) => setSelectId(e.target.value)}>
            <option value="">카테고리를 선택하세요</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <NewsImageInput image={image} setImage={setImage} />
        </div>
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="제목을 입력하세요."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2  text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-32"
            placeholder="본문을 입력하세요"
            defaultValue={""}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold cursor-pointer hover:bg-orange-600 transition-colors" onClick={handleClick}>
            작성 완료
          </button>
        </div>

      </div>
    </div>
  );
}
