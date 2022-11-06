import { Box, AppBar as MuiAppbar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppbar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MuiAppbar>
    </Box>
  );
}
