import { styled, alpha } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Typography, InputBase } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "12ch",
    "&:focus": {
      width: "20ch",
    },
  },
}));

type HeaderProps = {
  setIsVisible: () => void;
};

export const Header: React.FC<HeaderProps> = ({ setIsVisible }) => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 10, top: 0, left: 0, display: "flex", justifyContent: "center", width: "100%" }}>
      <Toolbar sx={{ width: "100%", maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={setIsVisible} size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "inherit" }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          CtrLNote
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

{
  /* <AppBar
  position="sticky"
  sx={{
    zIndex: 10,
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }}
>
  <Toolbar sx={{ width: "100%", maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
    <IconButton onClick={setIsVisible} size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "inherit" }}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
      CtrLNote
    </Typography>
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
    </Search>
  </Toolbar>
</AppBar>; */
}
