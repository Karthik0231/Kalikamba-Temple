import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  GlobalStyles,
  Stack,
  Typography,
  useTheme,
  Fade,
  Zoom,
} from "@mui/material";
import TempleIcon from "@mui/icons-material/TempleBuddhist";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FestivalIcon from "@mui/icons-material/Festival";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

function DonationsPage() {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateHeart, setAnimateHeart] = useState(false);

  const items = [
    {
      key: "belli-ratha",
      title: "ಬೆಳ್ಳಿ ರಥ ಸೇವೆ",
      description:
        "ಬೆಳ್ಳಿ ರಥದ ಮೂಲಕ ದೇವರ ಶೋಭಾಯಾತ್ರೆಯನ್ನು ಬೆಂಬಲಿಸಿ. ಭಕ್ತಿ ಮತ್ತು ಮಹತ್ವದೊಂದಿಗೆ ದೇವತೆಯನ್ನು ದೇವಾಲಯದ ಬೀದಿಗಳಲ್ಲಿ ಪ್ರದಕ್ಷಿಣೆ ಮಾಡುವ ಪವಿತ್ರ ಆಚರಣೆಗಳನ್ನು ಬೆಂಬಲಿಸಿ.",
      amountTiers: [501, 1001, 2501],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <FestivalIcon fontSize="inherit" />,
      badge: "ಪವಿತ್ರ ಶೋಭಾಯಾತ್ರೆ",
      subpoints: [
        "ರಥ ಅಲಂಕಾರ, ತೈಲ ಮತ್ತು ಬೆಳಕು",
        "ಪುರೋಹಿತರ ಸಂಭಾವನೆ ಮತ್ತು ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು",
        "ಸಮುದಾಯ ದರ್ಶನ ವ್ಯವಸ್ಥೆಗಳು",
      ],
    },
    {
      key: "annadana",
      title: "ಅನ್ನದಾನ ಸೇವೆ",
      description:
        "ಭಕ್ತರು ಮತ್ತು ಯಾತ್ರಿಗಳಿಗೆ ಆಶೀರ್ವದಿತ ಊಟ (ಪ್ರಸಾದಂ) ಅರ್ಪಣೆ. ನಿಮ್ಮ ಸೇವೆ ದೇಹ ಮತ್ತು ಹೃದಯಗಳನ್ನು ಪೋಷಿಸುತ್ತದೆ, ಕರುಣೆಯ ಕಾಲಾತೀತ ದೇವಾಲಯ ಸಂಪ್ರದಾಯವನ್ನು ಎತ್ತಿಹಿಡಿಯುತ್ತದೆ.",
      amountTiers: [301, 701, 1501],
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <LocalDiningIcon fontSize="inherit" />,
      badge: "ಆಶೀರ್ವದಿತ ಊಟ",
      subpoints: [
        "ದೈನಂದಿನ ಪ್ರಸಾದಂ ವಿತರಣೆ",
        "ತಾಜಾ ಪದಾರ್ಥಗಳು ಮತ್ತು ಪಾತ್ರೆಗಳು",
        "ನೈರ್ಮಲ್ಯ ಅಡುಗೆ ಕಾರ್ಯಾಚರಣೆಗಳು",
      ],
    },
  ];

  const handleDonate = (title, amount) => {
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
    alert(`"${title}" ಗಾಗಿ ದಾನ ಗೇಟ್‌ವೇಗೆ ಮರುನಿರ್ದೇಶನ${amount ? ` – ₹${amount}` : ""}`);
  };

  // Enhanced scroll-reveal with stagger
  const revealRef = useRef(null);
  useEffect(() => {
    const parent = revealRef.current;
    if (!parent) return;
    const children = Array.from(parent.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, index) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.style.setProperty("--reveal", "1");
            }, index * 150);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    children.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes floatY": {
            "0%": { transform: "translateY(0px) rotate(0deg)" },
            "33%": { transform: "translateY(-8px) rotate(1deg)" },
            "66%": { transform: "translateY(-4px) rotate(-1deg)" },
            "100%": { transform: "translateY(0px) rotate(0deg)" },
          },
          "@keyframes glowPulse": {
            "0%": { 
              boxShadow: `0 0 0px ${theme.palette.primary.main}00`,
              transform: "scale(1)"
            },
            "50%": { 
              boxShadow: `0 0 25px ${theme.palette.primary.main}44`,
              transform: "scale(1.05)"
            },
            "100%": { 
              boxShadow: `0 0 0px ${theme.palette.primary.main}00`,
              transform: "scale(1)"
            },
          },
          "@keyframes shimmer": {
            "0%": { 
              transform: "translateX(-100%) skewX(-15deg)",
              opacity: 0
            },
            "50%": {
              opacity: 1
            },
            "100%": { 
              transform: "translateX(100%) skewX(-15deg)",
              opacity: 0
            },
          },
          "@keyframes heartBeat": {
            "0%": { transform: "scale(1)" },
            "25%": { transform: "scale(1.2)" },
            "50%": { transform: "scale(1)" },
            "75%": { transform: "scale(1.1)" },
            "100%": { transform: "scale(1)" },
          },
          "@keyframes sparkle": {
            "0%": { transform: "scale(0) rotate(0deg)", opacity: 1 },
            "50%": { transform: "scale(1) rotate(180deg)", opacity: 0.8 },
            "100%": { transform: "scale(0) rotate(360deg)", opacity: 0 },
          },
          "@keyframes slideInUp": {
            "0%": { 
              transform: "translateY(60px)",
              opacity: 0
            },
            "100%": { 
              transform: "translateY(0)",
              opacity: 1
            },
          },
          "@keyframes ripple": {
            "0%": { 
              transform: "scale(0)",
              opacity: 0.6
            },
            "100%": { 
              transform: "scale(4)",
              opacity: 0
            },
          },
          ".lift-on-hover": {
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            willChange: "transform, box-shadow",
          },
          ".lift-on-hover:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
          },
          ".soft-outline": {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius * 2,
          },
          ".reveal": {
            opacity: "calc(var(--reveal, 0))",
            transform: "translateY(calc(30px * (1 - var(--reveal, 0)))) scale(calc(0.95 + 0.05 * var(--reveal, 0)))",
            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          },
          ".animated-bg": {
            background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.primary.main}05, ${theme.palette.secondary.main}05)`,
            animation: "gradientShift 8s ease-in-out infinite",
          },
          "@keyframes gradientShift": {
            "0%": { filter: "hue-rotate(0deg)" },
            "50%": { filter: "hue-rotate(10deg)" },
            "100%": { filter: "hue-rotate(0deg)" },
          },
        }}
      />

      <Box className="animated-bg" sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
        {/* Enhanced background effects */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            "&::before, &::after, &::after": {
              content: '""',
              position: "absolute",
              borderRadius: "50%",
              filter: "blur(100px)",
              animation: "floatY 8s ease-in-out infinite",
            },
            "&::before": {
              top: -200,
              right: -150,
              width: 500,
              height: 500,
              background: `radial-gradient(circle, ${theme.palette.primary.main}30, transparent 70%)`,
              animationDelay: "0s",
            },
            "&::after": {
              bottom: -200,
              left: -150,
              width: 600,
              height: 600,
              background: `radial-gradient(circle, ${theme.palette.secondary.main}25, transparent 70%)`,
              animationDelay: "2s",
            },
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            aria-hidden
            sx={{
              position: "absolute",
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              borderRadius: "50%",
              bgcolor: i % 2 ? theme.palette.primary.main : theme.palette.secondary.main,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1,
              animation: `floatY ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Header */}
        <Container maxWidth="lg" sx={{ pt: { xs: 6, sm: 8, md: 12 }, pb: 4 }}>
          <Stack spacing={4} alignItems="center" sx={{ textAlign: "center" }}>
            <Zoom in timeout={800}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ 
                  color: "primary.main", 
                  animation: "floatY 6s ease-in-out infinite",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: -8,
                      borderRadius: "50%",
                      background: `conic-gradient(${theme.palette.primary.main}22, transparent, ${theme.palette.secondary.main}22, transparent)`,
                      animation: "spin 8s linear infinite",
                      zIndex: -1,
                    }
                  }}
                >
                  <TempleIcon sx={{ fontSize: 48, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }} />
                </Box>
                <Chip 
                  label="ಪವಿತ್ರ ಸೇವೆ" 
                  color="primary" 
                  variant="filled"
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: "1.1rem",
                    px: 2,
                    py: 1,
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                  }} 
                />
                {animateHeart && (
                  <FavoriteIcon
                    sx={{
                      position: "absolute",
                      right: -30,
                      color: "error.main",
                      animation: "heartBeat 1s ease-in-out",
                      fontSize: 32,
                    }}
                  />
                )}
              </Stack>
            </Zoom>

            <Fade in timeout={1200}>
              <Typography
                variant="h2"
                fontWeight={900}
                className="reveal"
                data-reveal
                sx={{
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "gradientShift 4s ease-in-out infinite",
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                ದೇವಾಲಯ ದಾನಗಳು
              </Typography>
            </Fade>

            <Fade in timeout={1600}>
              <Typography
                variant="h6"
                color="text.secondary"
                className="reveal"
                data-reveal
                sx={{ 
                  maxWidth: 800, 
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                ಪವಿತ್ರ ಸೇವೆಯ ಮೂಲಕ ನಿಮ್ಮ ಭಕ್ತಿಯನ್ನು ಅರ್ಪಿಸಿ. ಸಂಪ್ರದಾಯ ಮತ್ತು ಕರುಣೆಯೊಂದಿಗೆ ಹೊಂದಿಕೊಂಡ ಕಾರಣವನ್ನು ಆರಿಸಿ—
                <Box component="span" sx={{ 
                  color: "primary.main", 
                  fontWeight: 700,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                  }
                }}> ಬೆಳ್ಳಿ ರಥ</Box> ಶೋಭಾಯಾತ್ರೆ
                ಅಥವಾ <Box component="span" sx={{ 
                  color: "secondary.main", 
                  fontWeight: 700,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, transparent)`,
                  }
                }}> ಅನ್ನದಾನ</Box> ಪ್ರಸಾದಂ ವಿತರಣೆಯನ್ನು ಬೆಂಬಲಿಸಿ.
              </Typography>
            </Fade>
          </Stack>
        </Container>

        {/* Cards */}
        <Container maxWidth="lg" ref={revealRef} sx={{ pb: { xs: 8, sm: 12 } }}>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {items.map((item, idx) => (
              <Grid item xs={12} lg={6} key={item.key} data-reveal className="reveal">
                <Card
                  className="lift-on-hover soft-outline"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: 4,
                      padding: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}20, transparent, ${theme.palette.secondary.main}20)`,
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "exclude",
                      opacity: hoveredCard === idx ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    },
                  }}
                  elevation={hoveredCard === idx ? 8 : 0}
                >
                  <CardActionArea 
                    disableRipple 
                    sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "stretch",
                      height: "100%",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 0,
                        height: 0,
                        borderRadius: "50%",
                        background: `${theme.palette.primary.main}15`,
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.6s ease",
                        zIndex: 0,
                      },
                      "&:hover::before": {
                        width: "150%",
                        height: "150%",
                      }
                    }}
                  >
                    <Box sx={{ position: "relative", width: "100%" }}>
                      <CardMedia
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          height: { xs: 220, sm: 260 },
                          objectFit: "cover",
                          filter: "saturate(1.1) contrast(1.05)",
                          transition: "transform 0.6s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          }
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 60%)",
                        }}
                      />
                      
                      {/* Animated badge */}
                      <Chip
                        label={item.badge}
                        color={idx % 2 ? "secondary" : "primary"}
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          fontWeight: 800,
                          backdropFilter: "blur(10px)",
                          bgcolor: "rgba(255,255,255,0.95)",
                          boxShadow: `0 4px 12px ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}30`,
                          animation: hoveredCard === idx ? "glowPulse 2s ease-in-out infinite" : "none",
                        }}
                      />

                      {/* Star decoration */}
                      <StarIcon
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          color: "warning.main",
                          fontSize: 28,
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                          animation: hoveredCard === idx ? "sparkle 2s ease-in-out infinite" : "none",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ width: "100%", p: { xs: 3, sm: 4 }, position: "relative", zIndex: 1, flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            color: "primary.contrastText",
                            bgcolor: idx % 2 ? "secondary.main" : "primary.main",
                            boxShadow: `0 8px 24px ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}40`,
                            animation: hoveredCard === idx ? "glowPulse 1.8s ease-in-out infinite" : "none",
                            fontSize: 24,
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              inset: -4,
                              borderRadius: "50%",
                              background: `conic-gradient(${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}, transparent, ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main})`,
                              animation: hoveredCard === idx ? "spin 3s linear infinite" : "none",
                              zIndex: -1,
                            }
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography 
                          variant="h5" 
                          fontWeight={900}
                          sx={{
                            background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main})`,
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>

                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 2.5,
                          lineHeight: 1.6,
                          fontSize: "1.05rem",
                        }}
                      >
                        {item.description}
                      </Typography>

                      <Stack direction="column" spacing={1.5} sx={{ mb: 3 }}>
                        {item.subpoints.map((sp, i) => (
                          <Stack key={i} direction="row" spacing={2} alignItems="center">
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${i % 2 ? theme.palette.secondary.main : theme.palette.primary.main}, ${i % 2 ? theme.palette.secondary.light : theme.palette.primary.light})`,
                                boxShadow: `0 2px 8px ${i % 2 ? theme.palette.secondary.main : theme.palette.primary.main}40`,
                                animation: hoveredCard === idx ? `ripple 2s ease-in-out infinite ${i * 0.2}s` : "none",
                              }}
                            />
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ fontWeight: 500 }}
                            >
                              {sp}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>

                      <Divider sx={{ my: 3, opacity: 0.7 }} />

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems={{ xs: "stretch", sm: "center" }}
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={1.5} flexWrap="wrap">
                          {item.amountTiers.map((amt, i) => (
                            <Chip
                              key={amt}
                              label={`₹${amt}`}
                              variant="outlined"
                              color={idx % 2 ? "secondary" : "primary"}
                              onClick={() => handleDonate(item.title, amt)}
                              sx={{
                                fontWeight: 800,
                                cursor: "pointer",
                                px: 2,
                                py: 1,
                                fontSize: "0.9rem",
                                transition: "all 0.3s ease",
                                position: "relative",
                                overflow: "hidden",
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: "-100%",
                                  width: "100%",
                                  height: "100%",
                                  background: `linear-gradient(90deg, transparent, ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}20, transparent)`,
                                  transition: "left 0.5s ease",
                                },
                                "&:hover": {
                                  bgcolor: `${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}15`,
                                  transform: "translateY(-2px)",
                                  boxShadow: `0 6px 16px ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}30`,
                                  "&::before": {
                                    left: "100%",
                                  }
                                },
                              }}
                            />
                          ))}
                        </Stack>

                        <Box sx={{ position: "relative", display: "inline-flex" }}>
                          <Button
                            size="large"
                            variant="contained"
                            color={idx % 2 ? "secondary" : "primary"}
                            onClick={() => handleDonate(item.title)}
                            sx={{
                              fontWeight: 900,
                              px: 4,
                              py: 1.5,
                              borderRadius: 3,
                              textTransform: "none",
                              fontSize: "1.1rem",
                              boxShadow: `0 8px 24px ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}40`,
                              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              position: "relative",
                              overflow: "hidden",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2), transparent 70%)`,
                                transform: "translateX(-100%)",
                                transition: "transform 0.6s ease",
                              },
                              "&:hover": { 
                                transform: "translateY(-4px) scale(1.05)",
                                boxShadow: `0 12px 32px ${idx % 2 ? theme.palette.secondary.main : theme.palette.primary.main}50`,
                                "&::before": {
                                  transform: "translateX(100%)",
                                }
                              },
                            }}
                          >
                            ದಾನ ಮಾಡಿ
                                                        {/* heart icon for subtle love cue */}
                            <FavoriteIcon sx={{ ml: 1, fontSize: 22, opacity: 0.9 }} />
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default DonationsPage;