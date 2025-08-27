import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  useTheme,
  Stack,
  IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function SevaCard({ seva, onInfoClick, onSelect, isSelected,  }) {
  const theme = useTheme();

  const handleCardClick = (e) => {
    if (e.target.closest('.quantity-controls') || e.target.closest('.info-button')) return;
    if (onSelect) onSelect(seva);
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    if (onInfoClick) onInfoClick(seva);
  };

  return (
    <Card
      onClick={handleCardClick}
      elevation={isSelected ? 6 : 1}
      sx={{
        maxWidth: 300,
        borderRadius: 2,
        p: 1,
        cursor: 'pointer',
        border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
        transition: '0.2s ease-in-out',
        backgroundColor: isSelected ? `${theme.palette.primary.light}10` : '#fff',
        position: 'relative',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-1px)'
        }
      }}
    >
      <IconButton
        className="info-button"
        onClick={handleInfoClick}
        sx={{
          position: 'absolute',
          top: 6,
          right: 6,
          p: 0.5,
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
        size="small"
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>

      <CardContent sx={{ p: 1.5 }}>
        <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
          <Avatar
            src={seva.image}
            alt={seva.name}
            sx={{
              bgcolor: theme.palette.primary.light,
              width: 38,
              height: 38,
              fontSize: 16,
              border: `1px solid ${theme.palette.divider}`
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              color: theme.palette.text.primary
            }}
          >
            {seva.name?.toUpperCase()}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 550,
              color: theme.palette.text.primary,
            }}
          >Sankalpa Time : 
            {seva.time}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main
            }}
          >
            ₹{seva.price}
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
            fontSize: '0.75rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {seva.description ||
            'Sevakarthas must be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected at counter no. 10.'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SevaCard;
