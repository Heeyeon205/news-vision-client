export default function CategoriesInput({categories, setSelectId}){
  
return(
<select
className="border"
onChange={(e) => setSelectId(e.target.value)}
>
<option value="">카테고리를 선택하세요</option>
{categories.map((category) => (
  <option key={category.id} value={category.id}>
    {category.name}
  </option>
))}
</select>
)  
}