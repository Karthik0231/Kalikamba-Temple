import React from 'react';
import { Box, Container, Typography, Divider, useTheme } from '@mui/material';

function AboutPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.dark, mb: 4 }}>
        About Sri Kalikamba Temple
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Our History
        </Typography>
        <Typography variant="body1" paragraph>
          The Sri Kalikamba Temple stands as a beacon of spiritual devotion and architectural grandeur,
          with a history deeply rooted in ancient traditions and local folklore. Established centuries ago,
          it has served as a sacred sanctuary for countless devotees seeking blessings and solace.
        </Typography>
        <Typography variant="body1" paragraph>
          Legend has it that the temple was founded by a revered sage who, after years of intense meditation,
          was graced by the divine vision of Goddess Kalikamba. Inspired by this celestial encounter,
          he consecrated an idol of the Goddess at this very spot, marking the genesis of this holy shrine.
          Over generations, the temple has undergone various renovations and expansions, each adding to its
          magnificence while preserving its original sanctity.
        </Typography>
        <Typography variant="body1" paragraph>
          The temple complex is not merely a place of worship but also a center for cultural and community
          activities, fostering a sense of unity and spiritual growth among its followers. It continues to
          be a testament to enduring faith and the rich heritage of the region.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Architectural Significance
        </Typography>
        <Typography variant="body1" paragraph>
          The architecture of Sri Kalikamba Temple is a splendid example of traditional Dravidian style,
          characterized by its towering gopurams (ornate entrance towers), intricate carvings, and
          spacious courtyards. Each pillar and wall tells a story, depicting mythological scenes and
          divine figures that resonate with spiritual energy.
        </Typography>
        <Typography variant="body1" paragraph>
          The main sanctum houses the exquisitely crafted idol of Goddess Kalikamba, adorned with
          precious jewels and vibrant silks, radiating a powerful aura of divinity. The temple also
          features several sub-shrines dedicated to other deities, creating a comprehensive spiritual
          experience for visitors.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Festivals and Traditions
        </Typography>
        <Typography variant="body1" paragraph>
          Throughout the year, Sri Kalikamba Temple celebrates numerous festivals with great fervor and
          devotion. The annual Brahmotsavam, Navaratri, and Deepavali are celebrated with grand processions,
          special pujas, and cultural performances, attracting devotees from far and wide.
        </Typography>
        <Typography variant="body1" paragraph>
          The temple adheres to ancient Vedic rituals and traditions, meticulously performed by a lineage
          of dedicated priests. These practices ensure the sanctity of the temple and the continuity of
          its spiritual legacy.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to preserve and promote the spiritual and cultural heritage of Sri Kalikamba Temple,
          providing a sacred space for worship, spiritual learning, and community service. We strive to
          foster devotion, peace, and harmony among all who visit.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutPage;