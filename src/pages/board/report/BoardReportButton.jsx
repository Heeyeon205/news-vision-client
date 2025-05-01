export default function BoardReportButton({ boardId }) {
  const handleReport = () => {};

  return (
    <button
      onClick={handleReport}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      신고하기
    </button>
  );
}
