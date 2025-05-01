import { useState } from "react";
import apiClient from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function PollCreatePage() {
  const [title, setTitle] = useState("");
  const [expiredAt, setExpiredAt] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (options.length > 3) {
      alert("최대 4개의 항목까지만 추가할 수 있습니다.");
      return;
    }
    setOptions([...options, ""]);
  };

  const handleChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemove = (index) => {
    if (options.length <= 2) {
      alert("최소 2개의 항목이 필요합니다.");
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/polls", {
        title,
        expiredAt,
        options,
      });
      const result = res.data;
      toast.success("투표 생성 완료!");
      navigate(`/poll/${result.data}`);
      console.log("res: ", res);
      console.log("result: ", result);
      console.log("result.data: ", result.data);
      console.log("result.id: ", result.id);
      console.log("result.data.id: ", result.data.id);
      console.log("result.data.data: ", result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="투표 제목을 작성해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          value={expiredAt}
          onChange={(e) => setExpiredAt(e.target.value)}
        />
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`항목 ${index + 1}`}
            />
            <button onClick={() => handleRemove(index)}>삭제</button>
          </div>
        ))}
        <p onClick={handleClick}>항목 추가</p>
        <button type="submit">투표 생성</button>
      </form>
    </div>
  );
}
