import React from 'react'

import ActiveLink from './ActiveLink'

import { faFileExcel } from '@fortawesome/free-regular-svg-icons'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'

import '../styles/Aside.css'

const Aside = () => {
  return (
    <aside className="min-h-screen w-2/12 bg-background ">
      <div className="flex text-primary h-16 border-b border-white bg-background items-center justify-center">Logo</div>
      <nav className="w-full">
        <ul className="grid grid-cols-1 w-full">
          <li className="mx-2 flex-1">
            <ActiveLink to="/" name={'Loading files'} icon={faFileExcel} color={'blue'}></ActiveLink>
          </li>
          <li className="mx-2 flex-1">
            <ActiveLink to="/file-management" name={'File managment'} icon={faFolder} color={'blue'}></ActiveLink>
          </li>
          <li className="mx-2 flex-1">
            <ActiveLink to="/data-analysis" name={'Data analysis'} icon={faChartBar} color={'blue'}></ActiveLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Aside
