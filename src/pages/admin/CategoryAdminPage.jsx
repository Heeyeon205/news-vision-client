import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import CategoriesInput from "../../utils/CategoriesInput";
import { toast } from "sonner";

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState([]);
  const [selectId, setSelectId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const loadCategory = async () => {
    try {
      const response = await apiClient.get("/api/category");
      const result = response.data;
      setCategories(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim())
      return toast.warning("카테고리 이름을 입력하세요.");
    try {
      await apiClient.post("/api/category", { name: newCategory });
      toast.success("카테고리 추가 완료");
      setNewCategory("");
      loadCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!selectId) return toast.warning("삭제할 카테고리를 선택하세요.");
    try {
      await apiClient.delete(`/api/category/${selectId}`);
      toast.success("카테고리 삭제 완료");
      setSelectId("");
      loadCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold">카테고리 추가</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="새 카테고리명"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded text-sm cursor-pointer"
        >
          추가
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6">카테고리 삭제</h3>
      <div className="flex items-center  gap-2">
        <CategoriesInput
          categories={categories}
          selectId={selectId}
          setSelectId={setSelectId}
        />
        <div className="w-50 flex">
          <button
            onClick={handleDelete}
            className="px-8 py-[10px] bg-orange-500 hover:bg-orange-400 text-white rounded text-sm cursor-pointer "
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
