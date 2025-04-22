import { useEffect, useState } from 'react'
import { fetchNewsList } from '../../api/newsApi'

export default function Main() {
  const [newsList, setNewsList] = useState([]);

  const today = new Date();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const dayOfWeek = weekdays[today.getDay()];
  const formatDate = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 (${dayOfWeek})`;

  useEffect(() => {
    async function loadNews() {
      try{
        const data = await fetchNewsList();
        setNewsList(data);
      }catch(error){
        console.log('뉴스리스트 불러오기 실패', error)
      }
    }
      loadNews();
  }, []);

  return (
    <div>
      <h4>{formatDate}</h4>
      {newsList.length === 0 ? (
        <p>뉴스리스트가 없습니다.</p>
      ) : (
        <div className='newsContainer'>
          {newsList.map(news => (
            <div key={news.id} className='newsBox'>
              <div className='newsImage'>
                <img src={news.image} alt='뉴스 썸네일'></img>  
              </div>
              <div className='newsContent'>
                <p>{news.category}</p>
                <h4>{news.title}</h4>
                <span>{news.nickname}</span><span>{news.createAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}