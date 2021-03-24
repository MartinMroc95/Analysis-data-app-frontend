import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const primary = {
  backgroundColor: 'rgba(63, 81, 181, 0.1)',
  borderColor: 'rgba(63, 81, 181, 0.4)',
  backgroundColorHover: 'rgba(63, 81, 181, 1)',
  borderColorHover: 'rgba(63, 81, 181, 1)',
}

const secondary = {
  backgroundColor: 'rgba(0, 188, 212, 0.1)',
  borderColor: 'rgba(0, 188, 212, 0.4)',
  backgroundColorHover: 'rgba(0, 188, 212, 1)',
  borderColorHover: 'rgba(0, 188, 212, 1)',
}
const success = {
  backgroundColor: 'rgba(16, 185, 129, 0.1)',
  borderColor: 'rgba(16, 185, 129, 0.4)',
  backgroundColorHover: 'rgba(16, 185, 129, 1)',
  borderColorHover: 'rgba(16, 185, 129, 1)',
}

const remove = {
  backgroundColor: 'rgba(233, 30, 99, 0.1)',
  borderColor: 'rgba(233, 30, 99, 0.4)',
  backgroundColorHover: 'rgba(233, 30, 99, 1)',
  borderColorHover: 'rgba(233, 30, 99, 1)',
}

const error = {
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  borderColor: 'rgba(239, 68, 68, 0.4)',
  backgroundColorHover: 'rgba(239, 68, 68, 1)',
  borderColorHover: 'rgba(239, 68, 68, 1)',
}

function CustomizedButton({ children, ...props }) {
  const [color, setColor] = useState('')

  const switchClassName = (key) => {
    switch (key) {
      case 'primary':
        return setColor(primary)
      case 'secondary':
        return setColor(secondary)
      case 'success':
        return setColor(success)
      case 'remove':
        return setColor(remove)
      case 'error':
        return setColor(error)
      default:
        break
    }
  }

  useEffect(() => {
    switchClassName(props.buttoncolor)
  }, [props.buttoncolor])

  const useStyles = makeStyles(() => ({
    root: {
      width: '140px',
      boxShadow: 'none',
      textTransform: 'none',
      lineHeight: 1.5,
      marginRight: '10px',
      borderRadius: '2px',
      backgroundColor: color.backgroundColor,
      color: '#000018',
      border: `1px solid ${color.borderColor}`,
      '&:hover': {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: color.backgroundColorHover,
        borderColor: color.borderColorHover,
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: `0 0 0 0.2rem ${color.borderColor}`,
      },
      '&:disabled': {
        borderColor: 'rgba(192, 192, 192, 1)',
        backgroundColor: 'rgba(192, 192, 192, 0.6)',
      },
    },
  }))

  const classes = useStyles()

  return (
    <Button className={classes.root} {...props} onClick={props.onClick}>
      {children}
    </Button>
  )
}

export default CustomizedButton
