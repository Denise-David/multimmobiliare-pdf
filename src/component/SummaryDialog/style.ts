// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme: Theme) => ({

  margin: {
    margin: theme.spacing(4),
  },
  alignRight: {
    textAlign: 'right',
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
  button: {
    textAlign: 'center',
    marginTop: theme.spacing(7),
  },
}));
export default useStyles;