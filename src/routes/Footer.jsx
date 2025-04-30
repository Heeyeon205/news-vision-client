export default function Footer() {
  return (
    <footer className="w-full text-white py-7 bottom-0 flex flex-col md:flex-row justify-around p-23">
      <div className="w-full md:w-150 ml-0 md:ml-5 mb-4 md:mb-0 text-center md:text-left">
        {" "}
        <h2 className="text-2xl font-bold mb-4 text-black">NEWSION</h2>
        <p className="text-gray-500 mb-2">
          ㈜뉴션 대표: 2조 | 사업자 등록번호: 632-51-02355 | 통신판매업
          <br />
          신고번호: 2025-서울강남-0415 <br /> 서울특별시 강남구 강남대로78길 8
        </p>
      </div>
      <div className="w-full md:w-100 h-auto ml-0 md:ml-5 flex flex-col justify-center items-center mt-1">
        <div className="flex">
          <a className="p-4" href="http://">
            github
          </a>
          <a className="p-4" href="http://">
            github
          </a>
          <a className="p-4" href="http://">
            github
          </a>
        </div>

        <div className="flex">
          <a className="text-gray-500 p-3" href="http://">
            아티클
          </a>
          <a className="text-gray-500 p-3" href="http://">
            GptNews
          </a>
          <a className="text-gray-500 p-3" href="http://">
            커뮤니티
          </a>
          <a className="text-gray-500 p-3" href="http://">
            검색
          </a>
        </div>
      </div>
    </footer>
  );
}
