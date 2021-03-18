import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import ExcelReader from './pages/ExcelReader'
import FileManagment from './pages/FileManagment'
import DataAnalysis from './pages/DataAnalysis'

import Footer from './components/Footer'
import Header from './components/Header'
import Aside from './components/Aside'

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
    main: () => <FileManagment />,
  },
  {
    path: '/data-analysis',
    /* sidebar: () => <div>Dashboard</div>, */
    main: () => <DataAnalysis />,
  },
]

function App() {
  /*   const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  } */

  return (
    <Router>
      <div className="App">
        <div className="flex min-h-screen max-w-full bg-myGray">
          <Aside />
          <div className="flex flex-col min-h-screen justify-between w-10/12">
            <Header />
            <main className="px-5 pt-5 flex-grow bg-white">
              <Switch>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} exact={route.exact} children={<route.main />} />
                ))}
              </Switch>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
