import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorAlert from "../../utils/ErrorAlert";
import apiClient from "../../api/axios";

export default function NewsUpdatePage() {
  const location = useLocation();
  const [selectId, setSelectId] = useState();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState({});
  const { newsId } = location.state;
  useEffect(() => {
    if (!newsId) {
      alert("뉴스 아이디가 없음 오류");
      return;
    }
    const loadData = async () => {
      try {
        const response = await apiClient.get(`/api/news/update/${newsId}`);
        const result = response.data;
        if (!result.success) {
          ErrorAlert();
          return;
        }
        console.log(result.data);
        setData(result.data);
        setImage(result.data.image);
        setTitle(result.data.title);
        setContent(result.data.content);
      } catch (error) {
        ErrorAlert(error);
      }
    };
    loadData();
  }, [newsId]);

  const handleClick = async () => {};

  return (
    <div className="newsContainer">
      {data && data.refTitle ? (
        <>
          <div className="referenceBox border">
            <h3>{data.refTitle}</h3>
            <p>{data.refPubDate}</p>
            <a href={data.refLink}>뉴스 확인하러 가기</a>
          </div>

          <select
            className="border"
            onChange={(e) => setSelectId(e.target.value)}
          >
            <option value={data.categoryId}>카테고리를 선택하세요</option>
            {data.list?.map((category) => (
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
              placeholder="본문을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <button className="border" onClick={handleClick}>
              작성 완료
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
