import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { root, title } = classes;

  return (
    <div className={root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={title}>
            <span role="img">🍽</span> ITRS Gothenburg Breakfast
            <span role="img">☕</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
