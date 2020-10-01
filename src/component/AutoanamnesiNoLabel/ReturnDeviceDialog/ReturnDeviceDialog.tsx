import React from 'react';
import { Dialog, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import QRCode from 'qrcode.react';
import useStyles from './style';
import Nav from '../../Navbar/Navbar';
import ButtonReturnDevice from './ButtonReturnDevice/ButtonReturnDevice';
import { dialogReturnDeviceOpen } from '../../../store/slice/dialogSlice';

const ReturnDeviceDialog = () => {
  const isOpen = useSelector(dialogReturnDeviceOpen);
  const classes = useStyles();

  return (
    <Dialog fullScreen open={isOpen}>
      <Nav />
      <div className={classes.marginDialog}>
        <Typography className={classes.margin} variant="h4" align="center">
          Mostri cortesemente l&apos;apparecchio al personale amministrativo
        </Typography>
        <Typography variant="h4" align="center" color="primary">
          Grazie!
        </Typography>
        <div className={classes.center}>
          <QRCode value={`${window.location.host}/home?etichetta=4153656`} />
        </div>
        <ButtonReturnDevice />
      </div>

    </Dialog>
  );
};

export default ReturnDeviceDialog;
