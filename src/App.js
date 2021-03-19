// import React, { useState } from 'react'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import ExcelReader from './pages/ExcelReader'
// import FileManagment from './pages/FileManagment'
// import DataAnalysis from './pages/DataAnalysis'

// import Footer from './components/Footer'
// import Header from './components/Header'
// import Aside from './components/Aside'

// import './App.css'

// const routes = [
//   {
//     path: '/',
//     exact: true,
//     /*  sidebar: () => <div>Home</div>, */
//     main: () => <ExcelReader />,
//   },
//   {
//     path: '/file-management',
//     /* sidebar: () => <div>Dashboard</div>, */
//     main: () => <FileManagment />,
//   },
//   {
//     path: '/data-analysis',
//     /* sidebar: () => <div>Dashboard</div>, */
//     main: () => <DataAnalysis />,
//   },
// ]

// function App() {
//   /*   const [selectedFile, setSelectedFile] = useState()
//   const [isFilePicked, setIsFilePicked] = useState(false)

//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0])
//     setIsFilePicked(true)
//   } */

//   return (
//     <Router>
//       <div className="App">
//         <div className="flex min-h-screen max-w-full bg-myGray">
//           <Aside />
//           <div className="flex flex-col min-h-screen justify-between w-10/12">
//             <Header />
//             <main className="px-5 pt-5 flex-grow bg-white">
//               <Switch>
//                 {routes.map((route, index) => (
//                   <Route key={index} path={route.path} exact={route.exact} children={<route.main />} />
//                 ))}
//               </Switch>
//             </main>
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </Router>
//   )
// }

// export default App

import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InsertChartOutlinedSharpIcon from '@material-ui/icons/InsertChartOutlinedSharp'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

import ExcelReader from './pages/ExcelReader'
import FileManagement from './pages/FileManagement'
import DataAnalysis from './pages/DataAnalysis'

import './App.css'

const routes = [
  {
    path: '/',
    exact: true,
    /*  sidebar: () => <div>Home</div>, */
    main: () => <ExcelReader />,
  },
  {
    path: '/file-management',
    /* sidebar: () => <div>Dashboard</div>, */
    main: () => <FileManagement />,
  },
  {
    path: '/data-analysis',
    /* sidebar: () => <div>Dashboard</div>, */
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const App = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Loading files</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/file-management">
              <ListItemIcon>
                <FolderOutlinedIcon />
              </ListItemIcon>
              <ListItemText>File management</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/data-analysis">
              <ListItemIcon>
                <InsertChartOutlinedSharpIcon />
              </ListItemIcon>
              <ListItemText>Data Analysis</ListItemText>
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
      </div>
    </Router>
  )
}

export default App
