import { useState, useEffect } from "react";
import QrCode from "react-qr-code"
import { Proof, ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { Box, CircularProgress, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useSignals } from "@preact/signals-react/runtime";
import { proofs } from "../../Utils/baseStore";
import { ConnectButton } from "./ConnectButton";

export function Reclaim() {
  useSignals();
  const theme = useTheme();
  const TWITTER_ID = import.meta.env.VITE_RECLAIM_PROVIDER_TWITTER_ID;
  const GITHUB_ID = import.meta.env.VITE_RECLAIM_PROVIDER_GITHUB_ID;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [requestUrl, setRequestUrl] = useState<string>("");
  const [proof, setProofs] = useState<string | Proof | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [PROVIDER_ID, setProviderId] = useState<string>(GITHUB_ID);

  useEffect(() => {
    async function initializeReclaim() {
      const APP_ID = import.meta.env.VITE_RECLAIM_APP_ID;
      const APP_SECRET = import.meta.env.VITE_RECLAIM_APP_SECRET;

      const reclaimProofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID
      );

      const url = await reclaimProofRequest.getRequestUrl();
      setRequestUrl(url);

      await reclaimProofRequest.startSession({
        onSuccess: (proof) => {
          console.log("Verification success", proof);
          if (proof) {
            if (typeof proof !== 'string' && proof?.claimData?.context) {
              const data = JSON.parse(proof.claimData.context);
              proofs.value = {
                signature: proof?.signatures[0],
                provider: selectedTab === 0 ? 'GitHub' : 'Twitter',
                username: data?.extractedParameters?.username,
                loggedIn: true
              }
              setProofs(proof);
            }
          }
        },
        onError: (error) => {
          console.error("Verification failed", error);
        },
      });
    }

    initializeReclaim();
  }, [selectedTab, PROVIDER_ID]);

  useEffect(() => {
    // Simulate different URLs for different platforms
    const urls = {
      twitter: TWITTER_ID,
      github: GITHUB_ID
    };

    setProviderId(selectedTab === 0 ? urls.github : urls.twitter);
  }, [selectedTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setSelectedTab(newValue);
    setRequestUrl("");

  };


  return (
    <>
      <Paper
      elevation={3}
      sx={{
        width: isMobile ? '100%' : '400px',
        backgroundColor: 'rgba(38, 38, 38, 0.95)',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              color: '#888',
              '&.Mui-selected': {
                color: '#fff',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#20B2AA',
            },
          }}
        >
          <Tab
            label="GitHub"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              py: 2,
            }}
          />
          <Tab
            label="Twitter"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              py: 2,
            }}
          />
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        {requestUrl ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
            }}
          >
            <QrCode
              value={requestUrl}
              style={{
                height: 'auto',
                maxWidth: '100%',
                width: '100%',
              }}
              level="L"
              bgColor="transparent"
              fgColor="#fff"
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
            }}
          >
            <CircularProgress color="primary"/>
          </Box>
        )}

        {
          proof && (
            <ConnectButton sx={{
              mt: 3,
              width: '100%',
              height: '48px',
              background: `${selectedTab === 0 ? 'linear-gradient(135deg, #20B2AA 0%, #4169E1 100%)' : 'linear-gradient(135deg, #4169E1 0%, #20B2AA 100%)'}`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 700,
              '&:hover': {
                opacity: 0.9,
              },
            }} />
          )
        }
      </Box>
    </Paper>
    </>
  );
}
