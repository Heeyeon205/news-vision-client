import { useState } from "react";
import CategoryAdminPage from "./CategoryAdminPage";
import BoardReportAdminPage from "./BoardReportAdminPage";
import CommentReportAdminPage from "./CommentReportAdminPage";

export default function AdminMainPage() {
  const [activeTab, setActiveTab] = useState("category");

  const renderTabContent = () => {
    switch (activeTab) {
      case "category":
        return <CategoryAdminPage />;
      case "board":
        return <BoardReportAdminPage />;
      case "comment":
        return <CommentReportAdminPage />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">관리자 페이지</h2>

      {/* 탭 메뉴 */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("category")}
          className={`px-4 py-2 font-medium ${
            activeTab === "category"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-500 hover:text-orange-500"
          }`}
        >
          카테고리 관리
        </button>
        <button
          onClick={() => setActiveTab("board")}
          className={`px-4 py-2 font-medium ${
            activeTab === "board"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-500 hover:text-orange-500"
          }`}
        >
          게시글 신고 관리
        </button>
        <button
          onClick={() => setActiveTab("comment")}
          className={`px-4 py-2 font-medium ${
            activeTab === "comment"
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-500 hover:text-orange-500"
          }`}
        >
          댓글 신고 관리
        </button>
      </div>

      {/* 탭 내용 렌더링 */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
