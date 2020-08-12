import React from 'react';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import {
  IconButton, Paper, Typography, Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { selectData } from '../../store/slice/formSlice';
import AnswerLineEditor from '../AnswerLineEditor/AnswerLineEditor';
import EmptyAnswerLineEditor from '../EmptyAnswerLineEditor/EmptyAnswerLineEditor';
import EmptyQuestionLineEditor from '../EmptyQuestionLineEditor/EmptyQuestionLineEditor';
import {
  modifyDomandaAction, stateTextField, isDisable, colDisable, disableAll, enableAll,
} from '../../store/slice/editFormSlice';
import { initialID } from '../../store/slice/initialStateSlice';
import useStyles from './style';

const QuestionsAndAnswersEditor = () => {
  const dispatch = useDispatch();
  const iniID = useSelector(initialID);
  const domande = useSelector(selectData);
  const textFieldState = useSelector(stateTextField);
  const disableActive = useSelector(isDisable);
  const colorButton = useSelector(colDisable);
  const classes = useStyles();

  if (iniID !== 0) {
    const listItems = domande.map((domanda : any) => (

      <div key={domanda.ID}>
        <Paper className={classes.bordiCard} elevation={3}>
          <div className={classes.bordi}>
            <span className={classes.bordi}>
              <Grid container>
                <Grid item xs={12} sm={1} />
                <Grid item xs={12} sm={1} />

                <Grid item xs={12} sm={5}>
                  <Typography variant="subtitle1" align="center">
                    Domanda
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" align="center">
                    Risposte
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Typography variant="subtitle1" align="center">
                    Valore
                  </Typography>
                </Grid>

              </Grid>

              <Divider />
            </span>
            <Grid container spacing={3}>
              {textFieldState[domanda.ID]
                ? (
                  < >
                    <Grid item xs={12} sm={1}>
                      <IconButton
                        disabled={disableActive}
                        onClick={() => {
                          dispatch(modifyDomandaAction(domanda.ID));
                          dispatch(disableAll());
                        }}
                      >
                        <CreateIcon color={colorButton} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton disabled={disableActive}>
                        <DeleteIcon color={colorButton} />
                      </IconButton>
                    </Grid>
                  </ >
                ) : (
                  < >
                    <Grid item xs={12} sm={1}>
                      <IconButton onClick={() => {
                        dispatch(modifyDomandaAction(domanda.ID));
                        dispatch(enableAll());
                      }}
                      >
                        <CheckCircleOutlineIcon color="primary" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton onClick={() => {
                        dispatch(modifyDomandaAction(domanda.ID));
                        dispatch(enableAll());
                      }}
                      >
                        <HighlightOffIcon color="primary" />
                      </IconButton>
                    </Grid>
                  </ >
                ) }

              <Grid item xs={12} sm={10}>
                <TextField
                  disabled={textFieldState[domanda.ID]}
                  value={domanda.Domanda}
                  fullWidth
                />
              </Grid>
            </Grid>
            <AnswerLineEditor id={domanda.ID} />
            <EmptyAnswerLineEditor />
          </div>
        </Paper>
      </div>

    ));
    return (

      <div>
        {listItems}
        <EmptyQuestionLineEditor />
      </div>
    );
  }
  return (
    <div>
      <EmptyQuestionLineEditor />
    </div>
  );
};

export default QuestionsAndAnswersEditor;