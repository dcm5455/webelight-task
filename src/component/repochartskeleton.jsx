import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const RepoChartSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Skeleton variant="rounded" width={1070} height={40} />
      </Box>
      <Skeleton variant="rounded" width={1070} height={298} />
      <Skeleton variant="rounded" width={1070} height={298} />
    </Stack>
  );
};

export default RepoChartSkeleton;
