import { Box } from "@mui/material";
import { ReactNode } from "react";

export const Wrapper = ({ children }: WrapperProps) => {
  return <Box sx={{ mx: "auto", width: "90%" }}>{children}</Box>;
};

type WrapperProps = {
  children: ReactNode;
};
