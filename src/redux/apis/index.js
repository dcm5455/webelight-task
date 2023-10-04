import axios from "axios";

export const fetchRepoApi = async (fromDate, pageNumber, signal) => {
  return await axios.get(
    `https://api.github.com/search/repositories?q=created:>${
      2017 - 10 - 22
    }&sort=stars&order=desc&page=${pageNumber}`,
    {
      signal
    }
  );
};

export const fetchActivityApi = async (owner, repo, signal) => {
  return await axios.all([
    axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`,
      { signal }
    ),
    axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      {
        signal
      }
    ),
    axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
      {
        signal
      }
    )
  ]);
};
