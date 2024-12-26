import { Feedback as FeedbackIcon } from "@mui/icons-material"
import { Box, Container, Stack, Typography } from "@mui/material"
import { useEffect, useRef } from "react";

const feedback = [
  { id: 1, message: "Great platform!", user: "User1" },
  { id: 2, message: "Very user-friendly.", user: "User2" },
  { id: 3, message: "Excellent support.", user: "User3" },
  { id: 4, message: "Highly recommend.", user: "User4" },
  { id: 5, message: "Fantastic experience.", user: "User5" },
  { id: 6, message: "Love it!", user: "User6" },
];

const CommunityFeedback = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
      const scroll = () => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += 10;
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
      };
      const interval = setInterval(scroll, 20);
      return () => clearInterval(interval);
    }, []);


  return (
    <Container maxWidth="lg">
        <Stack
            spacing={4}
            sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: { xs: 3, md: 6 },
            pt: { xs: 3, md: 5 },
            position: "relative",
            zIndex: 1,
            }}
        >
            <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
                variant="h3"
                component="h1"
                sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3rem" },
                mb: 2,
                }}
            >
                What Our Community Says
            </Typography>
            <Typography
                variant="h6"
                sx={{
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "800px",
                mb: 6,
                }}
            >
                Hear from artists and collectors who are part of the DefiBliss ecosystem
            </Typography>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                    width: '100%',
                    mb: 3,
                }}
            ref={scrollRef}
            >
                {[...feedback, ...feedback].map((feedback, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: '0 0 25%',
                            minWidth: '300px',
                            maxWidth: '300px',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 2,
                            mx: 1,
                        }}
                    >
                        <FeedbackIcon sx={{ mr: 2, color: 'white' }} />
                        <Box>
                            <Typography variant="body1" sx={{ color: 'white' }}>{feedback.message}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>- {feedback.user}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Stack>
    </Container>
  )
}

export default CommunityFeedback