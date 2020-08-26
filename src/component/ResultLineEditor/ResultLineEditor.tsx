import React from 'react';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EmptyResultLineEditor from '../EmptyResultLineEditor/EmptyResultLineEditor';
import { domandeView } from '../../store/slice/domandeModifySlice';
import {
  colDisable, disableAll, enableAll, risultati, setBModifyClicked,
  setBModifyUnclicked, deleteRisultato,
} from '../../store/slice/risultatiAddFormSlice';
import { objectToArray } from '../../util';

const ResultLineEditor = () => {
  const dispatch = useDispatch();

  const risultatiObject = useSelector(risultati);
  const domande = useSelector(domandeView);
  const colorButton = useSelector(colDisable);

  const risultatiArray = objectToArray(risultatiObject);

  if (domande !== null) {
    const listRisultati = risultatiArray ? risultatiArray.map((oneForm: any) => (

      // eslint-disable-next-line react/jsx-key
      <Grid container spacing={3}>
        {!oneForm.stateModify
          ? (
            <>
              <Grid item xs={12} sm={1}>
                <IconButton

                  onClick={() => {
                    dispatch(disableAll());
                    dispatch(setBModifyClicked(oneForm.IDRisultato));
                  }}
                >
                  <CreateIcon color={colorButton} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton onClick={() => dispatch(deleteRisultato(oneForm.IDRisultato))}>
                  <DeleteIcon color={colorButton} />
                </IconButton>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={2}>
                <IconButton onClick={() => {
                  dispatch(enableAll());
                  dispatch(setBModifyUnclicked(oneForm.IDRisultato));
                }}
                >
                  <CheckCircleOutlineIcon color="primary" />
                </IconButton>
              </Grid>
            </>

          )}

        <Grid item xs={12} sm={6}>
          <TextField disabled={!oneForm.stateModify} id="standard-basic" value={oneForm.risultato} fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField disabled={!oneForm.stateModify} id="standard-basic" value={oneForm.ValoreMin} fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField disabled={!oneForm.stateModify} id="standard-basic" value={oneForm.ValoreMax} fullWidth />
        </Grid>
      </Grid>
    )) : <></>;
    return (
      <div>
        {listRisultati}
        <EmptyResultLineEditor />

      </div>
    );
  }

  return (
    <div />
  );
};

export default ResultLineEditor;
