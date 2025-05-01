export default function CategoriesInput({ categories, selectId, setSelectId }) {
  return (
    <select
      value={selectId}
      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-10"
      onChange={(e) => setSelectId(e.target.value)}
    >
      <option value="">카테고리를 선택하세요</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
