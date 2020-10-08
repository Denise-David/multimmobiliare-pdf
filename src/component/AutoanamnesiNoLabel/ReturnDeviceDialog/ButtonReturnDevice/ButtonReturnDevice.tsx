import React from 'react';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import useStyles from './style';
import { closeReturnDeviceDialog } from '../../../../store/slice/dialogSlice';
import { resetCercato, resetList } from '../../../../store/slice/homepageNoLabelSlice';

const ButtonReturnDevice = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const buttonFineDispatch = () => {
    dispatch(closeReturnDeviceDialog());
    dispatch(resetCercato());
    dispatch(resetList());
  };

  return (
    <>
      <Button
        size="large"
        className={classes.margin}
        variant="contained"
        color="primary"
        onClick={buttonFineDispatch}
      >
        Fine
      </Button>
    </>
  );
};

export default ButtonReturnDevice;