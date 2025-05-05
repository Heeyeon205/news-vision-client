import { toast } from "sonner";

export function validateNewsInput({ image, selectId, title, content }) {
  if (!image) {
    toast.warning("사진을 선택해 주세요.");
    return false;
  }
  if (selectId < 2) {
    toast.warning("카테고리를 선택해 주세요.");
    return false;
  }
  if (title.length < 6) {
    toast.warning("제목이 너무 짧습니다. 최소 6자 이상 작성해 주세요.");
    return false;
  }
  if (title.length > 50) {
    toast.warning("제목이 너무 깁니다. 최대 50자까지 작성할 수 있습니다.");
    return false;
  }
  if (content.length < 300) {
    toast.warning("본문 내용이 너무 짧습니다. 최소 300자 이상 작성해 주세요.");
    return false;
  }
  if (content.length > 3000) {
    toast.warning("본문 내용이 너무 깁니다. 최대 3000자까지 작성할 수 있습니다.");
    return false;
  }
  return true;
}
