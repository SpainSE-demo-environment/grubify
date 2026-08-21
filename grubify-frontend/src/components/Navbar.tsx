import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Box,
  styled,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingBagOutlined as CartIcon,
  PersonOutline as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const sections = ['Mujer', 'Hombre', 'Niño', 'Calzado', 'Accesorios'];

const Search = styled('form')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid rgba(17,17,17,0.25)',
  '&:focus-within': {
    borderBottomColor: '#111111',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#111111',
  fontSize: '0.8rem',
  letterSpacing: '0.04em',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.5, 0, 0.5, 1),
    width: '14ch',
    transition: theme.transitions.create('width'),
    '&:focus': {
      width: '20ch',
    },
    '&::placeholder': {
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontSize: '0.7rem',
      opacity: 0.6,
    },
  },
}));

const NavLink = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px 0',
  fontFamily: '"Jost", "Helvetica Neue", sans-serif',
  fontSize: '0.8rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#111111',
  position: 'relative',
  whiteSpace: 'nowrap',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -2,
    width: '100%',
    height: '1px',
    backgroundColor: '#111111',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.25s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
});

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount] = useState(3); // This would come from a cart context in a real app

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSectionClick = (section: string) => {
    navigate(`/?section=${encodeURIComponent(section)}`);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        borderBottom: '1px solid rgba(17,17,17,0.10)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 60, md: 72 }, px: { xs: 2, md: 4 } }}>
        <Typography
          component="div"
          onClick={handleLogoClick}
          sx={{
            cursor: 'pointer',
            fontFamily: '"Jost", "Helvetica Neue", sans-serif',
            fontWeight: 500,
            fontSize: { xs: '1.4rem', md: '1.7rem' },
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            pl: 0.5,
          }}
        >
          Dressify
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Search onSubmit={handleSearch}>
          <SearchIcon sx={{ fontSize: 18, color: '#111111' }} />
          <StyledInputBase
            placeholder="Buscar"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>

        <IconButton color="inherit" aria-label="cuenta" sx={{ ml: { xs: 0.5, md: 1.5 } }}>
          <PersonIcon />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="shopping cart"
          onClick={handleCartClick}
        >
          <Badge
            badgeContent={cartItemCount}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#111111',
                color: '#FFFFFF',
                fontSize: '0.6rem',
                minWidth: 16,
                height: 16,
              },
            }}
          >
            <CartIcon />
          </Badge>
        </IconButton>
      </Toolbar>

      {/* Section nav */}
      <Box
        sx={{
          borderTop: '1px solid rgba(17,17,17,0.06)',
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 2.5, md: 5 },
          py: 1.25,
          px: 2,
          overflowX: 'auto',
        }}
      >
        {sections.map((section) => (
          <NavLink key={section} onClick={() => handleSectionClick(section)}>
            {section}
          </NavLink>
        ))}
      </Box>
    </AppBar>
  );
};

export default Navbar;
