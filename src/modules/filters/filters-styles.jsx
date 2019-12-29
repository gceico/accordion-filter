import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    alignSelf: 'center'
  },
  groupCheckbox: {
    marginLeft: 'auto'
  },
  groupExpansion: {
    flexDirection: 'column'
  },
  toggleButton: {
    width: 'fit-content'
  },
  searchField: {
    width: 200,
    margin: 0
  }
}))