export default function SearchMainPage() {
  return (
    <div className="searchContainer">
      <div className="searchBox">
        <input
          type="text"
          className="border"
          placeholder="궁금한 지식을 찾아보세요."
        ></input>
        <button className="border">검색</button>
      </div>

      <div className="wordBox">
        <button>금리</button>
      </div>
    </div>
  );
}
