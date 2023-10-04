import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Typography, Skeleton, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_REPOS } from "../redux/type/typerepo";
import RepoCard from "./repocard";

const RepoList = () => {
  const { repos, duration, hasMore, loadingState, errorState } = useSelector(
    (state) => state.repos
  );
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: FETCH_REPOS,
      payload: {
        duration: duration,
        pageNumber: pageNumber
      }
    });
  }, [pageNumber]);

  const observer = useRef();
  const lastRepoEleRef = useCallback(
    (node) => {
      if (loadingState) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore)
          setPageNumber((prev) => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loadingState, hasMore]
  );

  return (
    <Container>
      <Typography sx={{ marginY: 2, marginX: 3 }}>
        Popular GitHub Repos from last {duration} days
      </Typography>

      {repos.length > 0 &&
        repos.map((item, index) => {
          if (repos.length === index + 1) {
            return (
              <RepoCard innerRef={lastRepoEleRef} repo={item} key={item.id} />
            );
          }
          return <RepoCard repo={item} key={item.id} />;
        })}

      {errorState && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography component="p" variant="h5">
            Something Went Wrong, Refresh The App
          </Typography>
        </Box>
      )}

      {loadingState &&
        [1, 2, 3, 4].map((i) => {
          return (
            <Skeleton
              variant="rounded"
              sx={{ marginX: 3, marginY: 2 }}
              height={182}
              key={i}
            />
          );
        })}
    </Container>
  );
};

export default RepoList;
