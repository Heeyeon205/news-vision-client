import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { toast } from "sonner";

export default function AdminUserManagePage() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await apiClient.get("/admin/users");
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (id) => {
    try {
      await apiClient.put(`/admin/users/role/${id}`);
      toast.success(`${id}번 유저의 권한이 변경되었습니다.`);
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/users/delete/${id}`);
      toast.success(`${id}번 유저를 삭제했습니다.`);
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">유저 관리</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">등록된 유저가 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border rounded p-4 bg-white shadow hover:shadow-md transition"
            >
              <div className="flex flex-wrap text-sm w-full">
                <span className="w-5 font-semibold">{user.id}</span>
                <span className="w-30 break-all">{user.username}</span>
                <span className="w-25 break-all">{user.nickname}</span>
                <span className="w-10 break-all">{user.createdAt}</span>
                <span className="w-25 break-all">{user.provider}</span>
                <span className="w-25 break-all">{user.role}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRoleChange(user.id)}
                  className="px-3 py-1 rounded text-xs text-orange-400 border border-orange-400 hover:bg-orange-50 transition"
                >
                  권한 변경
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 rounded text-xs text-orange-600 border border-orange-600 hover:bg-orange-50 transition"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
