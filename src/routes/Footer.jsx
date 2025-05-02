export default function Footer() {
  return (
    <footer className="w-full h-full sm:h-60  text-white py-7 bottom-0  flex flex-col  sm:flex-row justify-around items-center p-0 sm:p-23 ">
      <div className="w-full  md:w-150 ml-0 md:ml-5 mb-4 md:mb-0 text-center md:text-left ">
        {' '}
        <h2 className="text-2xl font-bold mb-4 text-black">NEWSION</h2>
        <p className="text-gray-500 mb-2">
          ㈜뉴션 대표: 2조 | 사업자 등록번호: 632-51-02355 | 통신판매업
          <br />
          신고번호: 2025-서울강남-0415 <br /> 서울특별시 강남구 강남대로78길 8
        </p>
      </div>

      <div className="w-full sm:w-100 h-auto ml-0 sm:ml-5 flex flex-col  items-center mt-1 ">
        <div className="flex">
          <a
            href="https://github.com/Heeyeon205/newsion-server.git"
            target="_blank"
            className="p-4 text-gray-800 hover:text-gray-600 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-10 w-10"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.207 11.387.6.111.793-.261.793-.579 0-.286-.011-1.041-.017-2.045-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.805 1.305 3.49.997.108-.775.419-1.305.763-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.31.469-2.382 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.839 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.815 1.105.815 2.229 0 1.61-.014 2.91-.014 3.3 0 .321.19.694.8.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>

        <div className="flex  ">
          <a className="text-gray-500 p-3 " href="/article">
            아티클
          </a>
          <a className="text-gray-500 p-3" href="/gpt-info">
            핵심 브리핑
          </a>
          <a className="text-gray-500 p-3" href="/board">
            커뮤니티
          </a>
          <a className="text-gray-500 p-3" href="/search">
            검색
          </a>
        </div>
      </div>
    </footer>
  );
}
