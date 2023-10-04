import React from "react";
import {
  AppBar,
  Container,
  Select,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_DURATION } from "../redux/type/typerepo";

const Header = () => {
  const { duration } = useSelector((state) => state.repos);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({
      type: CHANGE_DURATION,
      payload: e.target.value
    });
  };

  return (
    <AppBar
      color="transparent"
      position="static"
      elevation={0}
      variant="outlined"
    >
      <Container>
        <Toolbar>
          <Typography sx={{ flex: 1, fontWeight: "bold" }} variant="h4">
            Starred Repo Spotlight
          </Typography>

          <Select
            value={duration}
            onChange={handleChange}
            sx={{
              width: 120,
              height: 40,
              marginLeft: 15
            }}
          >
            <MenuItem value={7}>1 Week</MenuItem>
            <MenuItem value={14}>2 Week</MenuItem>
            <MenuItem value={21}>1 Month</MenuItem>
            <MenuItem value={28}>1 Month</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
