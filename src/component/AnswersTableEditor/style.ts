// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({

  content: {
    padding: theme.spacing(4),
  },

  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  NavColor: {
    background: theme.palette.primary.main,
    padding: '2em',
    marginBottom: theme.spacing(2),
    borderRadius: '0.5em',
  },

  padding: {
    padding: theme.spacing(3),
  },

  marginDivider: {
    marginBottom: theme.spacing(3),
  },
  bordiCard: {
    margin: theme.spacing(),
  },
  marginTop: {
    marginTop: theme.spacing(4),
  },

}));
export default useStyles;
