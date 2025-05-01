import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../api/axios";
import NewsImageInput from "./NewsImageInput";
import NewsUpdateButton from "./NewsUpdateButton";
import NewsDeleteButton from "./NewsDeleteButton";
import CategoriesInput from "../../utils/CategoriesInput";

export default function NewsUpdatePage() {
  const location = useLocation();
  const [selectId, setSelectId] = useState();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState({});

  const { newsId } = location.state;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.get(`/api/news/update/${newsId}`);
        const result = response.data;
        console.log("뉴스 업데이트 데이터: ", result.data);
        setData(result.data);
        setImage(result.data.image);
        setTitle(result.data.title);
        setContent(result.data.content);
        setSelectId(result.data.categoryId);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [newsId]);

  return (
    <div className="p-4 max-w-[600px] w-full mx-auto min-h-screen">
      {data && data.refTitle ? (
        <>
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {data.refTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{data.refPubdate}</p>
            <a
              href={data.refLink}
              className="text-orange-500 text-sm font-medium hover:underline"
            >
              뉴스 확인하러 가기
            </a>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="mb-4">
              <CategoriesInput
                categories={data.list}
                selectId={selectId}
                setSelectId={setSelectId}
              />
            </div>
            <div className="mb-4">
              <NewsImageInput image={image} setImage={setImage} />
            </div>

            <div className="mb-4">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-32"
                placeholder="본문을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <NewsUpdateButton
                newsId={newsId}
                title={title}
                content={content}
                categoryId={data.categoryId}
                image={image}
              />

              <NewsDeleteButton newsId={newsId} />
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
