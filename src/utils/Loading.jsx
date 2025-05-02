export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999]">
      <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
