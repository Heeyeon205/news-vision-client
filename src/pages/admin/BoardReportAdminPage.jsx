import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { toast } from "sonner";

export default function BoardReportAdminPage() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const loadReports = async () => {
    try {
      const res = await apiClient.get("/admin/boardreports");
      setReports(res.data.data);
    } catch (err) {
      toast.error("신고 목록을 불러오지 못했습니다.");
    }
  };

  const handleIgnore = async (id) => {
    try {
      await apiClient.put(`/admin/boardreports/${id}/mark`);
      toast.success(`${id}번 신고를 처리했습니다.`);
      loadReports();
    } catch (err) {
      toast.error("처리 실패");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/boardreports/delete/${id}`);
      toast.success(`${id}번 신고를 삭제했습니다.`);
      loadReports();
    } catch (err) {
      toast.error("삭제 실패");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        게시글 신고 목록
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">신고된 게시글이 없습니다.</p>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">신고 ID</th>
                  <th className="p-2 border">게시글 ID</th>
                  <th className="p-2 border">작성자</th>
                  <th className="p-2 border">작성일</th>
                  <th className="p-2 border ">신고자</th>
                  <th className="p-2 border">처리</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-orange-50 transition">
                    <td className="p-2 border text-center">{report.id}</td>
                    <td
                      className="p-2 border text-center text-black hover:underline cursor-pointer"
                      onClick={() => navigate(`/board/${report.boardId}`)}
                    >
                      {report.boardId}
                    </td>
                    <td className="p-2 border text-center">
                      {report.boardWriter}
                    </td>
                    <td className="p-2 border text-center">
                      {report.boardCreatedAt}
                    </td>
                    <td className="p-2 border text-center ">
                      {report.userNickname}
                    </td>
                    <td className="p-2 border text-center space-x-2">
                      <button
                        onClick={() => handleIgnore(report.id)}
                        className="px-3 py-1 rounded text-xs  text-orange-400 hover:scale-110 transition"
                      >
                        승인
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="px-3 py-1 rounded text-xs  text-orange-700 hover:scale-110 transition"
                      >
                        반려
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border rounded p-4 shadow-sm bg-white"
              >
                <p className="text-sm font-semibold text-gray-700">
                  신고 ID: {report.id}
                </p>
                <p
                  className="text-sm text-blue-500 hover:underline cursor-pointer"
                  onClick={() => navigate(`/board/${report.boardId}`)}
                >
                  게시글 ID: {report.boardId}
                </p>
                <p className="text-sm">작성자: {report.boardWriter}</p>
                <p className="text-sm">작성일: {report.boardCreatedAt}</p>
                <p className="text-sm">신고자: {report.userNickname}</p>
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    onClick={() => handleIgnore(report.id)}
                    className="px-3 py-1 rounded text-xs  text-blue-600 hover:scale-110 transition"
                  >
                    처리
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="px-3 py-1 rounded text-xs  text-red-600 hover:scale-110 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
