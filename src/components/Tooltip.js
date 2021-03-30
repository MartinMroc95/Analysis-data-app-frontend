import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core'

const useStylesTooltip = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: '11px',
  },
}))

export const MyTooltip = (props) => {
  const classes = useStylesTooltip()

  return <Tooltip arrow placement="right" classes={classes} {...props} />
}
