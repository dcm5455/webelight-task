export const getActivityData = (commit_activity, code_frequency) => {
  if (
    Object.keys(commit_activity).length > 0 &&
    Object.keys(code_frequency).length > 0
  ) {
    let data = commit_activity.map((item) => {
      const match_code_freq = code_frequency.find(
        (arr) => arr[0] === item.week
      );
      let additions = match_code_freq ? match_code_freq[1] : 0;
      let deletations = match_code_freq ? match_code_freq[2] : 0;

      return {
        week: item.week,
        c: item.total,
        a: additions,
        d: deletations
      };
    });

    return data;
  } else if (Object.keys(commit_activity).length > 0) {
    let data = commit_activity.map((item) => {
      return {
        week: item.week,
        c: item.total,
        a: 0,
        d: 0
      };
    });

    return data;
  } else {
    return [];
  }
};

export const getContributorsData = (commit_activity, contribution) => {
  if (!Array.isArray(contribution)) return [];

  let contributors_data = contribution.map((c) => {
    let required_weeks = commit_activity.map((item) => {
      let matching_week = c.weeks.find((week) => week.w === item.week);
      let additions = matching_week ? matching_week.a : 0;
      let deletations = matching_week ? matching_week.d : 0;
      let commits = matching_week ? matching_week.c : 0;

      return {
        week: item.week,
        a: additions,
        d: deletations,
        c: commits
      };
    });

    return {
      total: c.total,
      author: c.author.login,
      weeks: required_weeks
    };
  });

  return contributors_data;
};
