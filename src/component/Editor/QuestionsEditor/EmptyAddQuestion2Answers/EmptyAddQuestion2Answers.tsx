import React, { ReactElement, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './style';
import {
  addDomandaInArray, resetDomanda, questionTwoAns, setDomandaTwoAns,
} from '../../../../store/slice/domandeAddFormSlice';
import { setUnsavedChanges } from '../../../../store/slice/addFormSlice';

/**
 * Riga domanda aggiungi domanda
 */
const EmptyAddQuestion2Answers = ():ReactElement => {
  const dispatch = useDispatch();
  const valoreTextField = useSelector(questionTwoAns);
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={classes.marginGenerico}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={10}>
          <TextField
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !disabled) {
                dispatch(addDomandaInArray());
                dispatch(resetDomanda());
                setDisabled(!disabled);
                dispatch(setUnsavedChanges());
              }
            }}
            value={valoreTextField}
            onChange={(event) => {
              const { value } = event.target;
              dispatch(setDomandaTwoAns(value));
              if (value === '' && disabled === false) {
                setDisabled(!disabled);
              } else if (disabled === true) {
                setDisabled(!disabled);
              }
            }}
            id="standard-basic"
            fullWidth
          />
        </Grid>
        <IconButton
          color="primary"
          disabled={disabled}
          onClick={() => {
            dispatch(addDomandaInArray());
            dispatch(resetDomanda());
            dispatch(setUnsavedChanges());
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>

      </Grid>
    </div>
  );
};

export default EmptyAddQuestion2Answers;
