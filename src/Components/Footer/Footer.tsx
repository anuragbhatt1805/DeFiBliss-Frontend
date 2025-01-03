import { Box, Container, Stack, Typography, Link, Select, MenuItem, SelectChangeEvent, Grid, useTheme, useMediaQuery } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useState } from 'react';
import Logo from "/src/assets/logo.webp"

export default function Footer() {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Box component="footer" sx={{ bgcolor: '#1A1A1A', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Logo and Description Column */}
          <Stack flex={1} spacing={2}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
            <img
            src={Logo}
            style={{
              width: isMobile ? 30: 50,
              height: isMobile ? 30 : 50,
              borderRadius: 10,
            }}
          />
              <Typography variant="h6" component="span">
                VeriCraft
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
              Authenticate and secure your digital artwork with blockchain technology.
            </Typography>
            <Box display="flex" gap={2}>
                <Link href="#" color="inherit" sx={{
                '&:hover': { color: '#1DA1F2'}
                }}>
                <TwitterIcon />
                </Link>
              <Link href="#" color="inherit" sx={{
                '&:hover': { color: '#FFA001' }
              }}>
                <GitHubIcon />
              </Link>
              <Link href="#" color="inherit" sx={{
                '&:hover': { color: '#0088cc' }
              }}>
                <TelegramIcon />
              </Link>
            </Box>
          </Stack>
        <Stack sx={{
            [theme.breakpoints.down('md')]: {
                gap: 4,
                flexWrap: 'wrap',
            },
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
            flex: 1,
            flexDirection: 'row',
        }}>
          {/* Quick Links Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {['Home', 'Explore', 'Artists', 'About Us'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: 'white' }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Resources Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {['Documentation', 'Help Center', 'Blog', 'API'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: 'white' }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: 'white' }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>
        </Stack>
        </Stack>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © 2024 VeriCraft. All rights reserved.
          </Typography>
          <Select
            value={language}
            onChange={handleLanguageChange}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.3)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.5)',
              },
              '.MuiSvgIcon-root': {
                color: 'rgba(255,255,255,0.7)',
              }
            }}
          >
            <MenuItem value="en">🌐 English</MenuItem>
            <MenuItem value="es">🌐 Español</MenuItem>
            <MenuItem value="fr">🌐 Français</MenuItem>
          </Select>
        </Box>
      </Container>
    </Box>
  );
}

