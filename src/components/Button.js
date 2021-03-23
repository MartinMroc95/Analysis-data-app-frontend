export const buttonSuccess = {
  width: '100px',
  heigth: '38px',
  margin: '0 10px 0 0',
  textTransform: 'none',
  lineHeight: 1.5,
  backgroundColor: 'rgba(16, 185, 129, 0.1)',
  border: '1px solid rgba(16, 185, 129, 0.4)',
  borderRadius: '2px',
  color: 'rgba(16, 185, 129, 1)',
  '&:hover': {
    backgroundColor: 'rgba(16, 185, 129, 1)',
    border: '1px solid rgba(16, 185, 129, 1)',
    color: 'white',
  },
}

export const buttonError = {
  width: '100px',
  heigth: '38px',
  margin: '0 10px 0 0',
  textTransform: 'none',
  lineHeight: 1.5,
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.4)',
  color: 'rgba(239, 68, 68, 1)',
  borderRadius: '2px',
  '&:hover': {
    backgroundColor: 'rgba(239, 68, 68, 1)',
    border: '1px solid rgba(239, 68, 68, 1)',
    color: 'white',
  },
}

export const buttonStatus = {
  heigth: '38px',
  margin: '0 10px 0 0',
  textTransform: 'none',
  lineHeight: 1.5,
  /* backgroundColor: 'rgba(63, 81, 181, 0.1)', */
  /* border: '1px solid rgba(63, 81, 181, 0.4)', */
   borderRadius: '2px',
  color: 'black',
  /* '&:hover': {
    backgroundColor: 'rgba(63, 81, 181, 0.3)',
    border: '1px solid rgba(63, 81, 181, 1)',
    color: 'rgba(63, 81, 181, 1),',
  }, */
}

export const buttonDelete = {
  width: '100px',
  heigth: '38px',
  margin: '0 10px 0 0',
  textTransform: 'none',
  lineHeight: 1.5,
  backgroundColor: 'rgba(63, 81, 181, 0.1)',
  border: '1px solid rgba(63, 81, 181, 0.4)',
  borderRadius: '2px',
  color: 'rgba(63, 81, 181, 1)',
  '&:hover': {
    backgroundColor: 'rgba(63, 81, 181, 1)',
    border: '1px solid rgba(63, 81, 181, 1)',
    color: 'white',
  },
}

/* import React from 'react'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button)

export default function CustomizedButtons({ children, props }) {
  return (
    <BootstrapButton {...props} color="primary">
      {children}
    </BootstrapButton>
  )
} */
