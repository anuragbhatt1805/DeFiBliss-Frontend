import { useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Container,
  Rating,
  styled
} from '@mui/material';

// Types
interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

// Mock Data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    role: 'Digital Artist',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    quote: 'VeriCraft has revolutionized how I share my artwork. The AI verification gives my collectors confidence in the authenticity of my pieces.'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'Collector',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    quote: 'As a collector, I love knowing that every piece I download is verified authentic. The blockchain tracking gives me complete peace of mind.'
  },
  {
    id: '3',
    name: 'James Lee',
    role: 'Photographer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    quote: 'The AI verification process is seamless, and the blockchain integration adds a new level of professionalism to my photography business.'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    role: 'Digital Creator',
    avatar: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    quote: 'The platform has transformed how I connect with my audience. The verification system adds a layer of trust to my work.'
  },
  {
    id: '5',
    name: 'Michael Chen',
    role: 'NFT Artist',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    quote: 'An incredible platform that has helped me reach new collectors and verify the authenticity of my digital art pieces.'
  }
];

// Styled Components
const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  overflowX: 'auto',
  paddingBottom: theme.spacing(3),
  scrollSnapType: 'x mandatory',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  WebkitOverflowScrolling: 'touch'
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  flexShrink: 0,
  width: '100%',
  scrollSnapAlign: 'center',
  backgroundColor: '#1E1E1E',
  border: '1px solid #2D2D2D',
  [theme.breakpoints.up('md')]: {
    width: 'calc(50% - 12px)'
  },
  [theme.breakpoints.up('lg')]: {
    width: 'calc(33.333% - 16px)'
  }
}));

export default function CommunityFeedback() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{
      color: 'white',
      py: {xs:8, md:10}
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            What Our Community Says
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'grey.500',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Hear from artists and collectors who are part of the VeriCraft ecosystem
          </Typography>
        </Box>

        <ScrollContainer ref={scrollContainerRef}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} elevation={0}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>

                <Rating
                  value={testimonial.rating}
                  readOnly
                  sx={{
                    '& .MuiRating-icon': {
                      color: '#14B8A6'
                    }
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    color: 'grey.300',
                    lineHeight: 1.6
                  }}
                >
                  "{testimonial.quote}"
                </Typography>
              </CardContent>
            </TestimonialCard>
          ))}
        </ScrollContainer>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3
          }}>
            <Typography
              variant="body2"
              sx={{ color: 'grey.500' }}
            >
              Scroll to see more Community Feedbacks →
            </Typography>
          </Box>
      </Container>
    </Box>
  );
}

