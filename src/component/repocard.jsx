import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  Card,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Link
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AdjustIcon from "@mui/icons-material/Adjust";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { activityActions } from "../redux/slice/activity";
import RepoChartSkeleton from "./repochartskeleton";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const RepoCard = ({ innerRef, repo }) => {
  const [expanded, setExpanded] = useState(false);
  const { currentExpanded } = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  const lastPushedDate = (date) => {
    return moment(date).format("MMMM Do, YYYY");
  };

  const handleExpandClick = (id) => {
    setExpanded((prev) => !prev);
    if (id !== currentExpanded) {
      dispatch(activityActions.setCurrentExpanded(id));
    }
  };

  const repoDesc =
    repo.description && repo.description.length > 200
      ? repo.description.slice(0, 200) + "..."
      : repo.description;

  return (
    <Card
      sx={{
        p: 2,
        marginY: 2,
        marginX: 3,
        maxWidth: "100%",
        flexGrow: 1,
        backgroundColor: "#d5f4e6"
      }}
      variant="outlined"
    >
      <Grid container spacing={2}>
        <Grid item>
          <Box sx={{ width: 150, height: 150 }}>
            <Img alt="complex" src={repo.owner.avatar_url} />
          </Box>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                ref={innerRef}
              >
                <Link
                  href={repo.html_url}
                  underline="none"
                  color="inherit"
                  target="_blank"
                >
                  {repo.name}
                </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {repoDesc}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<StarBorderIcon />}
                  label={repo.stargazers_count}
                  size="small"
                  color="warning"
                />
                <Chip
                  icon={<AdjustIcon />}
                  label={repo.open_issues_count}
                  size="small"
                  color="success"
                />
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="text.secondary" variant="body2">
                Last pushed at {lastPushedDate(repo.pushed_at)} by{" "}
                <Link
                  href={repo.owner.html_url}
                  underline="none"
                  color="inherit"
                  target="_blank"
                >
                  {repo.owner.login}
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "flex-end" }}>
            <ExpandMore
              expand={currentExpanded === repo.id && expanded}
              onClick={() => handleExpandClick(repo.id)}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Grid>
        </Grid>
      </Grid>
      <Collapse
        in={currentExpanded === repo.id && expanded}
        timeout="auto"
        unmountOnExit
      >
        <React.Suspense fallback={<RepoChartSkeleton />}>
          {currentExpanded === repo.id}
        </React.Suspense>
      </Collapse>
    </Card>
  );
};

export default RepoCard;
