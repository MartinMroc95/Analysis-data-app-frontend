import React, { useState } from 'react'
import { Switch, Route, NavLink, useLocation } from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import InsertChartOutlinedSharpIcon from '@material-ui/icons/InsertChartOutlinedSharp'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

import { Container, Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, Box } from '@material-ui/core'
import { Tooltip, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import FileUploading from './pages/FileUploading'
import FileManagement from './pages/FileManagement'
import DataAnalysis from './pages/DataAnalysis'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import './App.css'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <FileUploading />,
  },
  {
    path: '/file-management',
    main: () => <FileManagement />,
  },
  {
    path: '/data-analysis',
    main: () => <DataAnalysis />,
  },
]

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creator: { marginLeft: '5px', '&:hover': { color: '#000018', fontWeight: 'bold' } },
  isActive: {
    backgroundColor: '#3f51b5',
    color: ' white',
    '&:hover': {
      backgroundColor: '#3f51b5',
    },
  },
  isActiveIcon: {
    color: 'white',
  },
}))

const App = () => {
  const location = useLocation()
  const classes = useStyles()
  const theme = useTheme()

  const [openBar, setOpenBar] = useState(false)

  return (
    <Container maxWidth="xl" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openBar,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenBar(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openBar,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.header}>
            <Typography variant="h6" noWrap>
              Technological data analysis of the steelmaking
            </Typography>
            <Typography noWrap>
              created by{' '}
              <a className={classes.creator} target="_blank" rel="noreferrer" href="https://martinmroc.netlify.app/">
                Martin Mroc
              </a>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openBar,
          [classes.drawerClose]: !openBar,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openBar,
            [classes.drawerClose]: !openBar,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpenBar(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem activeClassName={classes.isActive} button exact component={NavLink} to={'/'}>
            <Tooltip title="Loading files" placement="right" arrow>
              <ListItemIcon className={location.pathname === '/' ? classes.isActiveIcon : null}>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText>Loading files</ListItemText>
          </ListItem>

          <ListItem button activeClassName={classes.isActive} component={NavLink} to={'/file-management'}>
            <Tooltip title="File management" placement="right" arrow>
              <ListItemIcon className={location.pathname === '/file-management' ? classes.isActiveIcon : null}>
                <FolderOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText>File management</ListItemText>
          </ListItem>

          <ListItem button activeClassName={classes.isActive} component={NavLink} to={'/data-analysis'}>
            <Tooltip title="Data analysis" placement="right" arrow>
              <ListItemIcon className={location.pathname === '/data-analysis' ? classes.isActiveIcon : null}>
                <InsertChartOutlinedSharpIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText>Data analysis</ListItemText>
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} children={<route.main />} />
          ))}
        </Switch>
      </main>
    </Container>
  )
}

export default App
