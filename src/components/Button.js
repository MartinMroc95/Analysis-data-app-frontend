import React from 'react'

const Button = ({ children, color }) => {
  return <button className="px-4 py-2 mr-4 bg-buttonColor text-background" >{children}</button>
}

export default Button
