import React, { useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Reclaim } from "../Components/Auth/ReclaimButton";
import { useNavigate, useSearchParams } from "react-router";
import { ConnectButton } from "../Components/Auth/ConnectButton";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken, proofs } from "../Utils/baseStore";
import Logo from "/src/assets/logo.webp"

export const Authentication: React.FC = () => {
  useSignals();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [query] = useSearchParams();

  const handleRedirect = () => {
    const url = query.get("redirect");
    navigate(url || '/');
  }

  useEffect(() => {
    if (accountToken && (accountToken.value?.length ?? 0) > 0)
      handleRedirect();
  }, [accountToken.value])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: isMobile ? 2 : 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Logo and Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 6,
          justifyContent: "center",
        }}
      >
        <img
            src={Logo}
            style={{
              width: isMobile ? 30: 50,
              height: isMobile ? 30 : 50,
              borderRadius: 10,
            }}
          />
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            fontWeight: 600,
            color: "white",
          }}
        >
          VeriCraft
        </Typography>
      </Box>

      {/* Component from different page */}
      <Box sx={{ width: "100%", mb: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
       }}>
        <Reclaim />
      </Box>

      {/* Spacer to push button to bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Centered Button */}
      <ConnectButton disabled={!!proofs.value && proofs.value.length > 0}/>
    </Box>
  );
};
