import axios from "axios";
import { useEffect, useState } from "react";
import { getActivityData, getContributorsData } from "../helper";

const useFetchActivity = (owner, repo) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [contributorsData, setContributorsData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const controller = new AbortController();

    axios
      .all([
        axios.get(
          `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
          { signal: controller.signal }
        ),
        axios.get(
          `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`,
          {
            signal: controller.signal
          }
        ),
        axios.get(
          `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
          {
            signal: controller.signal
          }
        )
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          let activity_data = getActivityData(res1.data, res2.data);
          let contributors_data = getContributorsData(res1.data, res3.data);
          setActivityData(activity_data);
          setContributorsData(contributors_data);
        })
      )
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [owner, repo]);

  return { loading, error, activityData, contributorsData };
};

export default useFetchActivity;
