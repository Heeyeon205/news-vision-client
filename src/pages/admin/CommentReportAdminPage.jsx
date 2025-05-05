import { useEffect, useState } from 'react';
import apiClient from '../../api/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function CommentReportAdminPage() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const loadReports = async () => {
    try {
      const res = await apiClient.get('/admin/commentreports');
      setReports(res.data.data);
    } catch (err) {
      toast.error('댓글 신고 목록을 불러오지 못했습니다.');
    }
  };

  const handleIgnore = async (id) => {
    try {
      await apiClient.put(`/admin/commentreports/${id}/mark`);
      toast.success(`${id}번 신고를 처리했습니다.`);
      loadReports();
    } catch (err) {
      toast.error('처리 실패');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/commentreports/delete/${id}`);
      toast.success(`${id}번 신고를 삭제했습니다.`);
      loadReports();
    } catch (err) {
      toast.error('삭제 실패');
    }
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">댓글 신고 목록</h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">신고된 댓글이 없습니다.</p>
      ) : (
        <>
          {/* 데스크탑용 테이블 */}
          <div className="hidden md:block">
            <table className="w-full border border-gray-300 text-sm table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border w-[60px]">신고 ID</th>
                  <th className="p-2 border w-[60px]">게시글 ID</th>
                  <th className="p-2 border w-[80px]">작성자</th>
                  <th className="p-2 border w-[80px]">신고자</th>
                  <th className="p-2 border w-[110px]">작성일</th>
                  <th className="p-2 border">댓글 내용</th>
                  <th className="p-2 border w-[120px]">처리</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-orange-50 transition">
                    <td className="p-2 border text-center">{report.id}</td>
                    <td
                      className="p-2 border text-center text-black cursor-pointer hover:underline"
                      onClick={() => navigate(`/board/${report.boardId}`)}
                    >
                      {report.boardId}
                    </td>
                    <td className="p-2 border text-center ">
                      {report.userNickname}
                    </td>
                    <td className="p-2 border text-center break-words ">
                      {report.commentWriter}
                    </td>
                    <td className="p-2 border text-center">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="p-2 border truncate max-w-xs">
                      {report.commentContent}
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

          {/* 모바일 카드뷰 */}
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
                <p className="text-sm">작성자: {report.userNickname}</p>
                <p className="text-sm">
                  작성일: {formatDate(report.createdAt)}
                </p>
                <p className="text-sm mt-2 text-gray-800 line-clamp-2">
                  댓글 내용: {report.commentContent}
                </p>
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
