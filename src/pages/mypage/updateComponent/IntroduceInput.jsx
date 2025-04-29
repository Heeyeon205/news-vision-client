export default function IntroduceInput({ introduce, setIntroduce }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">소개</label>
      <p className="text-xs text-gray-500 mb-2">나누고 싶은 지식이나 내 관심사를 소개해 주세요.</p>
      <textarea
        value={introduce ?? ""}
        onChange={(e) => setIntroduce(e.target.value)}
        rows={8}
        placeholder="소개를 입력하세요"
        className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 text-sm resize-none"
      />
    </div>
  );
}
