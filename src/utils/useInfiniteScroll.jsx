import { useState, useEffect } from "react";

export function useInfiniteScroll(fetchData, size = 10, uniqueKey = "id") {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const newContent = await fetchData(page, size);
      setData((prev) => {
        const existingIds = new Set(prev.map((item) => item[uniqueKey]));
        const filteredNew = newContent.filter(
          (item) => !existingIds.has(item[uniqueKey])
        );
        return [...prev, ...filteredNew];
      });
      if (newContent.length < size) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reset = () => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    hasMore,
    reset,
  };
}
