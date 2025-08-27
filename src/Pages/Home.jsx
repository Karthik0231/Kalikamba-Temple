import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
// HeroSection is no longer needed here
import ImageCarousel from '../components/ImageCarousel';
import MemberCard from '../components/MemberCard';
import HeroSection from '../Components/HeroSection';
import MarqueeStrip from '../Components/MarqueeStrip';
import BannerSection from '../Components/BannerSection';
import PanchangaSection from '../Components/PanchangaSection';
import QuickInfoBanner from '../Components/QuickAccess';


function Home() {
  const theme = useTheme();

    const heroImage = {
    src: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
    alt: 'Temple Entrance',
    title: 'Sri Kalikamba Temple Barkur',
    description: 'Welcome to the sacred abode of Goddess Kalikamba.',
  };

const todaySevaKartas = ['Smt. Lakshmi Rao', 'Sri Ganesh Hegde', 'Sri Ramesh Pai', 'Sri Vijay Shetty'];

  const teamMembers = [
    { id: 1, name: 'Priest Rama', position: 'Adalita Dharmadarshi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s' },
    { id: 2, name: 'Priest Krishna', position: '2 ne Dharmadarshi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s' },
    { id: 3, name: 'Volunteer Devi', position: '3 ne Dharmadarshi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s' },
    {id: 4, name: 'Volunteer Devi', position: '4 ne Dharmadarshi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s' },
  ];

  const banners = [
  {
    image: '/banners/pooja1.jpg',
    title: 'Special Pooja',
    buttonText: 'Know More',
    onClick: () => alert('Navigating to Special Pooja')
  },
  {
    image: '/banners/festival.jpg',
    title: 'Festival Highlights',
    buttonText: 'Explore',
    onClick: () => alert('Festival Page')
  }
];

 const data = {
  date: 'July 28, 2025',
  location: 'Udupi, Karnataka',
  panchanga: {
    tithi: { name: 'Shukla Dashami' },
    nakshatra: { name: 'Pushya' },
    yoga: { name: 'Siddha' },
    karana: { name: 'Taitila' },
    // vara: { name: 'Ravivara' }
  },
  sunMoon: {
    sunrise: '06:10 AM',
    sunset: '06:50 PM',
    moonrise: '10:45 PM',
    moonset: '11:30 AM'
  },
  muhurta: [
    { name: 'Rahu Kaal', time: '04:30 PM - 06:00 PM', type: 'inauspicious' },
    { name: 'Abhijit Muhurta', time: '12:00 PM - 12:50 PM', type: 'auspicious' }
  ]
};

  const quickActions = [
    { label: 'Book Seva', onClick: () => alert('Navigate to Book Seva') },
    { label: 'Donate', onClick: () => alert('Navigate to Donate') },
    { label: 'Contact Us', onClick: () => alert('Navigate to Contact') },
  ];

const newsItems = [
  {
    title: "354th Aradhana Mahotsava - INVITATION",
    description: "Join us for the grand celebration of our annual Aradhana Mahotsava with special sevas, cultural programs, and spiritual discourses. The three-day festival will feature traditional music, dance performances, and community feast (Annadana) for all devotees.",
    date: "2025-07-24",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" // Temple celebration image
  },
  {
    title: "13th Chaturmasya Deeksha Mahotsava - Mantralayam",
    description: "His Holiness will be observing the sacred Chaturmasya Deeksha starting from Ashada Shukla Ekadashi. Special arrangements have been made for devotees to participate in daily prayers, bhajans, and spiritual discourses during this auspicious period of four months.",
    date: "2025-07-22",
    image: "https://images.unsplash.com/photo-1583932450421-c4b6d6b4c635?w=400&h=300&fit=crop" // Spiritual ceremony image
  },
  {
    title: "Sri Jayateerthara Aradhana - 15.07.2025",
    description: "Annual commemoration of Sri Jayateertha Swamiji's aradhana will be observed with special pujas, abhisheka, and distribution of prasadam. Devotees are invited to participate in the morning and evening prayer sessions.",
    date: "2025-07-15",
    image: "https://images.unsplash.com/photo-1604608672516-a752905dbb2e?w=400&h=300&fit=crop" // Prayer ceremony image
  },
  {
    title: "Guru Purnima Celebrations - Special Programs",
    description: "Guru Purnima will be celebrated with great devotion featuring Guru Pada Puja, recitation of sacred texts, and special discourse on the significance of Guru-Shishya tradition. Cultural programs by local artists will be presented in the evening.",
    date: "2025-07-21",
    image: "https://images.unsplash.com/photo-1573049946206-b0d09e18c638?w=400&h=300&fit=crop" // Guru worship image
  },
  {
    title: "Monthly Ekadashi Vratham - Community Observance",
    description: "Monthly Ekadashi fast will be observed collectively with special prayers to Lord Vishnu. The day will begin with early morning abhisheka followed by bhajan sessions and conclude with community dinner for all participating devotees and their families.",
    date: "2025-07-28",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop" // Religious observance image
  },
  {
    title: "New Goshala Inauguration - Cow Protection Initiative",
    description: "Our new Goshala facility will be inaugurated to provide shelter and care for sacred cows. This initiative aims to promote cow protection and will include facilities for cow care, organic farming, and production of traditional dairy products for temple use.",
    date: "2025-07-30",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop" // Cow/farm image
  },
  {
    title: "Vedic Studies Workshop - Youth Education Program",
    description: "A comprehensive workshop on Vedic studies will be conducted for young devotees aged 12-25. The program includes Sanskrit learning, Vedic chanting, philosophy discussions, and practical applications of ancient wisdom in modern life.",
    date: "2025-08-05",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop" // Education/books image
  },
  {
    title: "Annadana Seva - Daily Free Meals Program Expansion",
    description: "Our daily Annadana seva is being expanded to serve 500 meals per day. We invite devotees to sponsor meals and participate in this noble seva. The program now includes special dietary arrangements for elderly and children visiting the temple.",
    date: "2025-08-01",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop" // Food serving image
  }
];


  return (
    <Box>
      {/* Image Carousel Section - now full width and responsive height */}
      {/* <ImageCarousel
        images={carouselImages}
        height={{ xs: '30vh', sm: '40vh', md: '50vh', lg: '60vh' }} // Responsive height
      /> */}

      <HeroSection image={heroImage} />
      
      <MarqueeStrip sevaKartas={todaySevaKartas} />


          {/* <BannerSection banners={banners} /> */}
      <PanchangaSection panchangaData={data} />

      <QuickInfoBanner
        newsItems={newsItems}
      />

      {/* Dedicated Team Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: theme.palette.primary.dark }}>
          Our Dedicated Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid
              item
              key={member.id}
              xs={4}   // 3 cards per row on extra-small (mobile) screens (12 / 3 = 4)
              sm={3}   // 4 cards per row on small screens (12 / 4 = 3)
              md={3}   // 4 cards per row on medium screens
              lg={3}   // 4 cards per row on large screens
              display="flex"
              justifyContent="center"
            >
              <MemberCard
                image={member.image}
                name={member.name}
                position={member.position}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* You can add more sections here for events, sevas, etc. */}
    </Box>
  );
}

export default Home;