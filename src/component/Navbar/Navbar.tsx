import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialogFormPatient, dialogFormPatientOpen } from '../../store/slice/dialogSlice';

const Navbar = () => {
  const formPatientOpen = useSelector(dialogFormPatientOpen);
  const dispatch = useDispatch();
  return (
    <AppBar position="static" color="primary">

      <Toolbar>
        {formPatientOpen
          ? (
            <IconButton onClick={() => dispatch(closeDialogFormPatient())} color="secondary">
              <ArrowBackIcon />
            </IconButton>
          ) : <></>}
        <Typography variant="h5">Autoanamnesi</Typography>

      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
