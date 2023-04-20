import { AppBar, Button, IconButton,  Stack, Toolbar, } from '@mui/material'
import React, { Fragment, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import unsplashLogo from './unsplash_logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import "./navstyle.css"


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  return (
    <Fragment>
      <AppBar  position='static' color='transparent' style={{boxShadow:'none'}}>
        <Toolbar>
          <IconButton size='small' edge='start' color='inherit' aria-label='logo'>
            <img style={{width:'30px', height:"30px"}} src= {unsplashLogo} alt='unplash logo'/>
          </IconButton>
        <Search style={{backgroundColor:"#80808029" , borderRadius:'30px', width:'40vw'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

        <Stack direction='row' spacing={2}>
          <Button color='inherit' style={{ textTransform: "none" }} >Explore</Button>
          <Button color='inherit' style={{ textTransform: "none" }}>Advertise</Button>
          <Button color='inherit'  style={{ textTransform: "none" }}>Unsplash+</Button>
          <span className='vertical_line'>

          </span>
          <Button  style={{ textTransform: "none" }} color='inherit'>Login</Button>
        </Stack>
        <IconButton size='small' edge='start' color='inherit' aria-label='logo'>
            <MenuIcon/>
          </IconButton>
      </Toolbar>
      </AppBar>

      <div className='subHeading'>


      </div>
    </Fragment>
  )
}

export default Navbar
