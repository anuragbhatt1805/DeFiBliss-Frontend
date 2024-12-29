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
import { NavLink, useNavigate } from "react-router";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken, proofs } from "../../Utils/baseStore";
import Logo from "/src/assets/logo.webp";

interface User {
  username: string;
  walletAddress: string;
  isLoggedIn: boolean;
}

export default function Navigation() {
  useSignals();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User>({
    username: "",
    walletAddress: ``,
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
    setUser({
      username: proofs?.value?.username || "Anonymous",
      walletAddress: `${accountToken.value?.slice(
        0,
        6
      )}...${accountToken.value?.slice(-4)}`,
      isLoggedIn: proofs?.value?.loggedIn || true,
    });
    navigate(`/reclaim?redirect=${window.location.pathname}`);
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
        <img
          src={Logo}
          style={{
            width: isMobile ? 30 : 50,
            height: isMobile ? 30 : 50,
            borderRadius: 10,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "white",
          }}
        >
          VeriCraft
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.text}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#00b894" : "transparent",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            })}
          >
            <ListItem component="li" key={item.text} onClick={handleDrawerToggle}>
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
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "row",
              w: "fit-content",
              ml: "10%",
            }}
          >
            <ListItemIcon
              sx={{
                color: "#DD0000",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                w: "100%",
                gap: 1,
              }}
            >
              <Logout fontSize="small" />
              <Button color="inherit" onClick={handleLogout} sx={{
              "&:hover": {
                background: "#00b894",
              },
            }}>
                Login
              </Button>
            </ListItemIcon>
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
              <img
                src={Logo}
                style={{
                  width: isMobile ? 30 : 50,
                  height: isMobile ? 30 : 50,
                  borderRadius: 10,
                }}
              />
              <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                VeriCraft
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
                <img
                  src={Logo}
                  style={{
                    width: isMobile ? 30 : 50,
                    height: isMobile ? 30 : 50,
                    borderRadius: 10,
                  }}
                />
                <Typography variant="h6">VeriCraft</Typography>
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
                      backgroundColor: isActive ? "#00b894" : "transparent",
                      borderRadius: "8px",
                      color: "white",
                    })}
                  >
                    <Button
                      key={item.text}
                      color="inherit"
                      startIcon={item.icon}
                      sx={{
                        borderRadius: "8px",
                        px: 2,
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
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
          ) : proofs.value?.loggedIn ? (
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
                  py: 0,
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Box>
                  <ListItem
                    sx={{
                      p: 0,
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
            <Button color="inherit" onClick={handleLogin}
            sx={{
              "&:hover": {
                background: "#00b894",
              },
            }}>
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
