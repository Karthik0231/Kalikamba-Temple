import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Stack,
  Tooltip,
  useTheme,
  Zoom
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';

const TempleEventCard = ({ event, onFavorite, onShare, isFavorited }) => {
  const theme = useTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <Zoom in timeout={500}>
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, #fff8f1)`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 10px 30px ${theme.palette.primary.main}25`,
            borderColor: theme.palette.primary.main
          }
        }}
      >
        {/* Image */}
        <CardMedia
          component="img"
          height="180"
          image={event.image}
          alt={event.title}
          sx={{ objectFit: 'cover' }}
        />

        {/* Content */}
        <CardContent sx={{ p: 3 }}>
          {/* Type and Status */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Chip
              icon={<TempleHinduOutlinedIcon fontSize="small" />}
              label={event.type}
              color="primary"
              size="small"
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
            <Chip
              label={event.status.toUpperCase()}
              size="small"
              sx={{
                backgroundColor:
                  event.status === 'upcoming'
                    ? theme.palette.success.light
                    : event.status === 'ongoing'
                    ? theme.palette.warning.light
                    : theme.palette.grey[400],
                fontWeight: 600
              }}
            />
          </Stack>

          {/* Title */}
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: theme.palette.text.primary }}>
            {event.title}
          </Typography>

          {/* Description */}
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, lineHeight: 1.6 }}>
            {event.description}
          </Typography>

          {/* Details */}
          <Stack direction="row" spacing={3} sx={{ mb: 3 }} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" color="primary" />
              <Typography variant="caption" fontWeight={500}>
                {formatDate(event.date)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" color="primary" />
              <Typography variant="caption" fontWeight={500}>
                {event.time}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography variant="caption" fontWeight={500}>
                {event.location}
              </Typography>
            </Stack>
          </Stack>

          {/* Actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1}>
              <Tooltip title="Add to favorites">
                <IconButton
                  onClick={() => onFavorite(event.id)}
                  sx={{
                    color: isFavorited ? theme.palette.error.main : theme.palette.text.secondary
                  }}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share event">
                <IconButton
                  onClick={() => onShare(event)}
                  sx={{ color: theme.palette.text.secondary }}
                >
                  <ShareIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              View Details
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default TempleEventCard;
