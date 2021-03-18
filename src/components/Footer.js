import React from 'react'

const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-12 bg-myGray">
      ©2020 Created by{' '}
      <a
        className="pl-1 hover:text-xl text-active "
        target="_blank"
        rel="noreferrer"
        href="https://martinmroc.netlify.app/"
      >
        Martin Mroc
      </a>
    </footer>
  )
}

export default Footer
