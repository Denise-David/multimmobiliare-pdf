import { Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbarEtichettaInesistente, snackbarEtichettaInesistente } from '../../../store/slice/snackbarSlice';

const SnackbarEtichettaInesistente = () => {
  const statusSnackbar = useSelector(snackbarEtichettaInesistente);
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={statusSnackbar}
      autoHideDuration={2000}
      onClose={() => dispatch(closeSnackbarEtichettaInesistente())}
    >
      <Alert severity="warning">
        <Typography variant="body1">
          Etichetta inesistente
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarEtichettaInesistente;