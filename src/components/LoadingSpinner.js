import { Box, makeStyles, Typography } from '@material-ui/core'
import BeatLoader from 'react-spinners/BeatLoader'

const useStyles = makeStyles((theme) => ({
  loading: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const LoadingSpinner = ({ children, loading }) => {
  const classes = useStyles()

  return (
    <>
      {loading ? (
        <Box className={classes.loading}>
          <BeatLoader color={'#3f51b5'} size={15} />
          <Typography style={{ marginTop: '5px' }}>{children}</Typography>
        </Box>
      ) : null}
    </>
  )
}
