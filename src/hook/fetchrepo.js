import axios from "axios";
import { useEffect, useState } from "react";

const useFetchRepos = (fromDate, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setRepos([]);
  }, [fromDate]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const controller = new AbortController();

    axios
      .get(
        `https://api.github.com/search/repositories?q=created:>${
          2017 - 10 - 22
        }&sort=stars&order=desc&page=${pageNumber}`,
        {
          signal: controller.signal
        }
      )
      .then((res) => {
        setRepos((prev) => [...prev, ...res.data.items]);
        setHasMore(res.data.items.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [fromDate, pageNumber]);

  return { loading, error, repos, hasMore };
};

export default useFetchRepos;
