import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Explore,
  Upload,
  Person,
  Logout,
} from "@mui/icons-material";
import { NavLink } from "react-router";

interface User {
  username: string;
  walletAddress: string;
  isLoggedIn: boolean;
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User>({
    username: "ABCXYZ",
    walletAddress: "0x232.......22",
    isLoggedIn: false,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setUser({ ...user, isLoggedIn: true });
  };

  const handleLogout = () => {
    setUser({ ...user, isLoggedIn: false });
    handleClose();
  };

  const navigationItems = [
    { text: "Dashboard", icon: <Dashboard />, url: "/dashboard" },
    { text: "Explore", icon: <Explore />, url: "/explore" },
    { text: "Upload", icon: <Upload />, url: "/upload" },
    { text: "Profile", icon: <Person />, url: "/profile" },
  ];

  const drawer = (
    <Box sx={{ bgcolor: "background.default", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          p: 2,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: 3,
            background: "linear-gradient(135deg, #20B2AA 0%, #4169E1 100%)",
            boxShadow: "0 4px 12px rgba(32, 178, 170, 0.25)",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "white",
          }}
        >
          DefiBliss
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <NavLink to={item.url} key={item.text} style={({ isActive }) => ({
            backgroundColor: isActive ? "#4169E1" : "transparent",
            borderRadius: "8px",
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            })}>
            <ListItem component="li" key={item.text}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      {user.isLoggedIn ? (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 2 }}>
          <ListItem>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText
              primary={user.username}
              secondary={user.walletAddress}
              sx={{ color: "white" }}
            />
          </ListItem>
        </Box>
      ) : (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 2 }}>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "background.default" }}>
        <Toolbar>
          {isMobile ? (
            <>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #20B2AA 0%, #4169E1 100%)",
                }}
              />
              <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                DefiBliss
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #20B2AA 0%, #4169E1 100%)",
                  }}
                />
                <Typography variant="h6">DefiBliss</Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                {navigationItems.map((item) => (
                  <NavLink
                    to={item.url}
                    key={item.text}
                    style={({ isActive }) => ({
                    backgroundColor: isActive ? "#4169E1" : "transparent",
                    borderRadius: "8px",
                    color: "white",
                    })}
                  >
                    <Button key={item.text} color="inherit" startIcon={item.icon} sx={{
                      borderRadius: "8px",
                      px: 2,
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }
                    }}>
                    {item.text}
                    </Button>
                  </NavLink>

                ))}
              </Box>
            </>
          )}
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              // sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : user.isLoggedIn ? (
            <div>
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  borderRadius: "10px",
                  py: 1,
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Box>
                  <ListItem
                    sx={{
                      py: 0,
                      my: 0,
                    }}
                  >
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText
                      primary={user.username}
                      secondary={user.walletAddress}
                      sx={{ color: "white" }}
                    />
                  </ListItem>
                </Box>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            bgcolor: "background.default",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
