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
      toast.warning("최대 4개의 항목까지만 추가할 수 있습니다.");
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
      toast.warning("최소 2개의 항목이 필요합니다.");
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      toast.warning("투표 제목을 작성해 주세요.");
      return;
    }

    if (expiredAt === "") {
      toast.warning("투표 마감일을 선택해 주세요.");
      return;
    }

    if (options.some(option => option.trim() === "")) {
      toast.warning("모든 투표 항목을 작성해 주세요.");
      return;
    }

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
    <div className="p-4 max-w-[600px] w-full mx-auto shadow-md rounded-lg mt-4">
      <div className="mx-8">
        <div className="flex flex-col justify-center mb-4">
          <div className="mb-2">
            <p className="text-sm">투표 제목</p>
          </div>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="투표 제목을 작성해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="mb-2">
            <p className="text-sm">투표 마감일</p>
          </div>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 "
            type="datetime-local"
            value={expiredAt}
            onChange={(e) => setExpiredAt(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <p className="text-sm">투표 선택지</p>
        </div>

        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-3">
            <input
              className="flex-1 border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              value={option}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`항목 ${index + 1}`}
            />

            <button onClick={() => handleRemove(index)}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded text-sm cursor-pointer hover:bg-orange-400 transition-colors"
            >삭제</button>

          </div>
        ))}

        <p onClick={handleClick} className="w-full px-3 py-2 rounded text-sm mb-5 text-center font-bold cursor-pointer bg-orange-500 text-white hover:bg-orange-400 transition-colors">항목 추가</p>
        <hr className="mt-5 mb-2 border-orange-500 border-t-2"></hr>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="mt-3 px-4 py-2 bg-orange-500 text-white rounded text-sm font-bold cursor-pointer hover:bg-orange-400 transition-colors">투표 생성</button>
        </div>
      </div>
    </div>
  );
}
