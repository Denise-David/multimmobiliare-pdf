import React, { useState } from 'react';
import {
  Grid, Typography, IconButton, TextField,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { haveRepModifyRight } from '../../store/slice/rightsSlice';
import { isBConfirmAddFormClicked } from '../../store/slice/addFormSlice';
import { disableAll, isBModifyDelAddReturnDisabled, enableAll } from '../../store/slice/disableEnableSlice';
import {
  setBModifyRis1Clicked, setBModifyRis1Unclicked, getRisposta1, isBModifyRis1Clicked, ris1,
} from '../../store/slice/risposteAddFormSlice';

const Risposta1Line = () => {
  const rightRepModify = useSelector(haveRepModifyRight);
  const addFormConfirm = useSelector(isBConfirmAddFormClicked);
  const iconsDisabled = useSelector(isBModifyDelAddReturnDisabled);
  const [bCheck1Disabled, setBCheck1] = useState(false);
  const bModifyRis1Clicked = useSelector(isBModifyRis1Clicked);
  const ans1 = useSelector(ris1);
  const dispatch = useDispatch();
  return (
    <>
      <Grid item xs={12} sm={10}>
        <Typography variant="subtitle1">
          Risposta di riferimento*
        </Typography>
      </Grid>
      <Grid item xs={12} sm={2}>
        {rightRepModify || addFormConfirm
          ? (
            <>
              {' '}
              {!bModifyRis1Clicked
                ? (
                  <IconButton
                    disabled={iconsDisabled}
                    color="primary"
                    onClick={() => {
                      dispatch(setBModifyRis1Clicked());
                      dispatch(disableAll());
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    disabled={bCheck1Disabled}
                    color="primary"
                    onClick={() => {
                      dispatch(setBModifyRis1Unclicked());
                      dispatch(enableAll());
                    }}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                )}

            </>
          ) : <></>}
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField
          value={ans1.risposta1}
          disabled={ans1.stateText}
          onChange={
    (event) => {
      const res1 = event.target.value;
      dispatch(getRisposta1(res1));
      if (res1 === '') {
        setBCheck1(!bCheck1Disabled);
      } else if (bCheck1Disabled === true) {
        setBCheck1(!bCheck1Disabled);
      }
    }
  }
          fullWidth
          variant="outlined"
        />
      </Grid>
    </>
  );
};

export default Risposta1Line;