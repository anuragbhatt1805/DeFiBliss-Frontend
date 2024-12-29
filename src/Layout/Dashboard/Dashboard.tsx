import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  color?: string;
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

interface UploadCardProps {
  title: string;
  uploadDate: string;
  downloads: number;
  imageUrl: string;
  isVerified: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, color = '#14B8A6' }) => (
  <Card sx={{ bgcolor: '#1C1C1C', color: 'white', height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Typography sx={{ color: color, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h3" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey.500' }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description }) => (
  <Card sx={{ bgcolor: '#1C1C1C', color: 'white', height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Typography sx={{ color: '#14B8A6', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h3" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey.500' }}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const UploadCard: React.FC<UploadCardProps> = ({
  title,
  uploadDate,
  downloads,
  imageUrl,
  isVerified
}) => (
  <Card sx={{ bgcolor: '#1C1C1C', color: 'white', p:2, borderRadius: 2 }}>
    <CardMedia
      component="img"
      height="300"
      image={imageUrl}
      alt={title}
      sx={{borderRadius: 1}}
    />
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        {isVerified && (
          <Typography sx={{ color: '#14B8A6' }}>
            Verified
          </Typography>
        )}
      </Box>
      <Typography variant="body2" sx={{ color: 'grey.500', mb: 1 }}>
        {uploadDate}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'grey.500' }}>
        <DownloadOutlined sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="body2">
          {downloads} downloads
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default function Dashboard() {

  const stats = [
    { title: 'Total Uploads', value: '247', subtitle: '+12 this week' },
    { title: 'Total Downloads', value: '1,834', subtitle: '+89 this week' },
    { title: 'Verification Rate', value: '98.2%', subtitle: 'Last 30 days' }
  ];

  const dashboardCards = [
    { title: 'Total Downloads', value: '34', description: 'This Month' },
    { title: 'Saved', value: '128', description: 'Total Items' },
    { title: 'Following', value: '56', description: 'Artist' },
    { title: 'Followers', value: '128', description: 'Total Followers' }
  ];

  const recentUploads = [
    {
      title: 'Abstract Harmony',
      uploadDate: 'Uploaded 2 days ago',
      downloads: 48,
      imageUrl: 'https://placehold.co/600x400',
      isVerified: true
    },
    {
      title: 'Digital Dreams',
      uploadDate: 'Uploaded 3 days ago',
      downloads: 36,
      imageUrl: 'https://placehold.co/600x400',
      isVerified: true
    },
    {
      title: 'Cosmic Wave',
      uploadDate: 'Uploaded 4 days ago',
      downloads: 29,
      imageUrl: 'https://placehold.co/600x400',
      isVerified: true
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{mt: 1}}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            Statistics
          </Typography>
        </Grid>
        {/* Stats Section */}
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        <Grid item xs={12} sx={{mt: 2}}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            Dashboard
          </Typography>
        </Grid>

        {
          dashboardCards.map((card, index) => (
            <Grid item xs={12} md={3} key={index}>
              <DashboardCard {...card} />
            </Grid>
          ))
        }

        {/* Recent Uploads Section */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ color: 'white', mt: 3, mb:0 }}>
            Recent Uploads
          </Typography>
        </Grid>

        {recentUploads.map((upload, index) => (
          <Grid item xs={12} md={4} key={index}>
            <UploadCard {...upload} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}