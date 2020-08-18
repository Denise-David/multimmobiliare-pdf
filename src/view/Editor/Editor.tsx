import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { DialogContent, MenuItem } from '@material-ui/core';
import Nav from '../../component/Navbar/Navbar';
import useStyles from './style';
import DepartmentChoiceEditor from '../../component/DepartmentChoiceEditor/DepartmentChoiceEditor';
import QuestionsAndAnswersEditor from '../../component/QuestionsAndAnswersEditor/QuestionsAndAnswersEditor';
import { add } from '../../store/slice/editFormSlice';
import { formType } from '../../store/slice/addFormSlice';
import QuestionsEditor from '../../component/QuestionsEditor/QuestionEditor';
import ResultTableEditor from '../../component/ResultTable/ResultTableEditor';
import AnswersTableEditor from '../../component/AnswersTableEditor/AnswersTableEditor';
import { user, repartiCreate } from '../../store/slice/rightsSlice';
import { extractAndMergeArray } from '../../util';

const FormPaziente = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'INIT' });
    dispatch({ type: 'initUserRightsAUTAN' });
  }, []);
  const addReparto = useSelector(add);
  const typeForm = useSelector(formType);
  const username = useSelector(user);
  // Estraggo i reparti e li unisco in un unico array (da spostare nel saga magari)
  const doppiArrayRepartiCreate = useSelector(repartiCreate);

  const listRepartiCreate = extractAndMergeArray(doppiArrayRepartiCreate);

  return (
    <div>

      <Nav />
      <div className={classes.root}>
        <Typography
          variant="subtitle1"
          align="right"
          color="primary"
        >
          {username}
        </Typography>
        <DepartmentChoiceEditor />
        {!addReparto
          ? (
            <>
              {/* Tabella Domande e risposte */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <Paper>
                    {typeForm === 'a più risposte'
                      ? <QuestionsAndAnswersEditor />
                      : (<>{typeForm === 'a due risposte' ? <QuestionsEditor /> : <></>}</>)}

                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  {/* Tabella Risultati */}
                  {/* <ResultTableEditor /> */}
                  {typeForm === 'a più risposte'
                    ? <ResultTableEditor />
                    : (<>{typeForm === 'a due risposte' ? <AnswersTableEditor /> : <></>}</>)}

                </Grid>

              </Grid>
            </>
          ) : (
            <>
              <DialogContent dividers>
                <MenuItem>
                  Ciao
                </MenuItem>
              </DialogContent>
            </>
          )}
      </div>
    </div>

  );
};
export default FormPaziente;
