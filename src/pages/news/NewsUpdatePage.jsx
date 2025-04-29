import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../api/axios";
import NewsImageInput from "./NewsImageInput";
import NewsUpdateButton from "./NewsUpdateButton";
import NewsDeleteButton from "./NewsDeleteButton";

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
        setData(result.data);
        setImage(result.data.image);
        setTitle(result.data.title);
        setContent(result.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [newsId]);

  return (
    <div className="newsContainer">
      {data && data.refTitle ? (
        <>
          <div className="referenceBox border">
            <h3>{data.refTitle}</h3>
            <p>{data.refPubDate}</p>
            <a href={data.refLink}>뉴스 확인하러 가기</a>
          </div>

          <CategoriesInput categories={data.list} setSelectId={setSelectId} />

          <div className="newsBox">
            <NewsImageInput image={image} setImage={setImage} />
            <input
              className="border"
              type="text"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
              className="borders"
              placeholder="본문을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <NewsUpdateButton
              newsId={newsId}
              title={title}
              content={content}
              categoryId={data.categoryId}
            />

            <NewsDeleteButton newsId={newsId} />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
