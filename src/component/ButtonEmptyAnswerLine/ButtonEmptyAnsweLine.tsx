import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { isBModifyDelAddReturnDisabled, disableAll, enableAll } from '../../store/slice/disableEnableSlice';
import {
  setAddRispostaClicked, addRisposta, resetRispostaType, stateAddedRisposta,
} from '../../store/slice/risposteAddFormSlice';
import { setBCheckDisabled, isBCheckDisabled } from '../../store/slice/domandeAddFormSlice';

interface Props{ IDDomanda: string}

const ButtonEmptyAnsweLine = ({ IDDomanda }:Props) => {
  const iconsDisabled = useSelector(isBModifyDelAddReturnDisabled);
  const bCheckDisabled = useSelector(isBCheckDisabled);
  const stateTextField = useSelector(stateAddedRisposta);
  const dispatch = useDispatch();
  if (stateTextField[IDDomanda]) {
    return (
      <>
        <Grid item xs={12} sm={1}>
          <IconButton
            disabled={iconsDisabled}
            onClick={() => {
              dispatch(setAddRispostaClicked(IDDomanda));
              dispatch(disableAll());
              dispatch(setBCheckDisabled());
            }}
            color="primary"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>

      </>
    );
  }
  return (
    <Grid item xs={12} sm={1}>
      <IconButton
        onClick={() => {
          dispatch(addRisposta(IDDomanda));
          dispatch(enableAll());
          dispatch(resetRispostaType(IDDomanda));
        }}
        color="primary"
        disabled={bCheckDisabled}
      >
        <CheckCircleOutlineIcon />
      </IconButton>
    </Grid>
  );
};

export default ButtonEmptyAnsweLine;