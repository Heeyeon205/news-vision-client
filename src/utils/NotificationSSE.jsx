import { useEffect } from "react";
import { toast } from "sonner";

export default function NotificationSSE({ userId }) {
  useEffect(() => {
    if (!userId) return;
    const eventSource = new EventSource(
      "http://localhost:8080/api/notice/subscribe"
    );

    eventSource.onopen = () => {
      console.log("sse연결");
    };

    eventSource.onmessage = (event) => {
      console.log("메세지:", event.data);
    };

    eventSource.addEventListener("connect", (event) => {
      console.log("서버연결:", event.data);
    });

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      console.log("알림:", data);
      toast.info("알림: ", data);
    });

    eventSource.onerror = (err) => {
      console.error("error: ", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

  return null;
}
