import { useEffect } from "react";
import { toast } from "sonner";

export default function NotificationSSE({ userId }) {
  useEffect(() => {
    if (!userId) return;
    const token = localStorage.getItem("accessToken");
    const eventSource = new EventSource(`/api/notice/subscribe?token=${token}`);

    eventSource.onopen = () => {
      console.log("SSE 연결 시도");
    };

    eventSource.onmessage = (event) => {
      console.log("메세지:", event.data);
    };

    eventSource.addEventListener("connect", (event) => {
      console.log("서버와 연결 결과:", event.data);
    });

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      console.log("알림:", data);
      toast.info("알림: ", data);
      toast.info(`알림: ${data.message}`);
      toast.info(`알림: ${JSON.stringify(data)}`);
    });

    eventSource.onerror = (err) => {
      console.error("SSE 연결 오류:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

  return null;
}
