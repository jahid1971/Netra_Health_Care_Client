import { useMediaQuery, useTheme } from "@mui/material";

export const isSmallScreen = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
};
