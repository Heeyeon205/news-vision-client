import { toast } from "sonner";

export default function ShareButton() {
  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL이 복사되었습니다!");
      })
      .catch(() => {
        toast.error("URL 복사에 실패했습니다.");
      });
  };

  return (
    <button
      onClick={handleCopyUrl}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      공유하기
    </button>
  );
}
