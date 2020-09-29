import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Collapse, Card,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import AnswerLineEditor from './AnswerLineEditor/AnswerLineEditor';
import EmptyAnswerLineEditor from './EmptyAnswerLineEditor/EmptyAnswerLineEditor';
import EmptyAddQuestionMoreAnswers from './EmptyAddQuestionMoreAnswers/EmptyAddQuestionMoreAnswers';
import HeaderDomandaMoreAnswers from './HeaderDomandaMoreAnswers/HeaderDomandaMoreAnswers';
import useStyles from './style';
import {
  domandeObject, modifyDomandaInObjectDomande, setBCheckDisabled,
  setBCheckEnabled, isBCheckDisabled, expandedTableMoreAnswers, setBModifyDomandaUnclicked,
} from '../../../store/slice/domandeAddFormSlice';
import { objectToArray } from '../../../util';
import { isBConfirmAddFormClicked } from '../../../store/slice/addFormSlice';
import { haveRepModifyRight } from '../../../store/slice/rightsSlice';
import {
  raggruppaAttivo, risposteTutteUguali, intestazioneMoreAnsAttiva,
} from '../../../store/slice/menuDomandeERisposteSlice';
import ButtonsQuestionsAndAnswers from './ButtonsQuestionsAndAnswers/ButtonsQuestionsAndAnswers';
import NavQuestionsAndAnswers from './NavQuestionsAndAnswers/NavQuestionsAnsAnswers';
import TextFieldIntestazioneQuesMoreAnswers from '../TextFieldIntestazioneQuesMoreAnswers/TextFieldIntestazioneQuesMoreAnsw';
import DropDownListGroup from '../DropDownListGroup/DropDownListGroup';
import HeaderAnsMoreAns from './HeaderAnsMoreAns/HeaderAnsMoreAns';
import { enableAll } from '../../../store/slice/disableEnableSlice';

const QuestionsAndAnswersEditor = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const domandeAddedObject = useSelector(domandeObject);
  const arrayDomandeAdded = objectToArray(domandeAddedObject);
  const rightRepModify = useSelector(haveRepModifyRight);
  const confirmAddFormClicked = useSelector(isBConfirmAddFormClicked);
  const bCheckDisabled = useSelector(isBCheckDisabled);
  const expanded = useSelector(expandedTableMoreAnswers);
  const risTutteUguali = useSelector(risposteTutteUguali);
  const intestazione = useSelector(intestazioneMoreAnsAttiva);
  const group = useSelector(raggruppaAttivo);

  const listDomandeAdded = arrayDomandeAdded.map((domanda : any, index) => {
    const { IDDomanda } = domanda;

    return (

      <div key={domanda.ID}>
        {domanda.Tipo === 'a più risposte'
          ? (
            <>
              {' '}
              {risTutteUguali
                ? (
                  <>
                    {index === 0
                      ? (
                        <Card className={classes.bordiCardRisposte}>
                          <div className={classes.bordi}>
                            <HeaderAnsMoreAns />

                            <AnswerLineEditor
                              id={domanda.IDDomanda}
                            />
                            {rightRepModify || confirmAddFormClicked
                              ? <EmptyAnswerLineEditor IDDomanda={domanda.IDDomanda} /> : <></>}

                          </div>
                        </Card>
                      ) : <></>}
                  </>
                )
                : <></>}
              <Card className={classes.bordiCard} elevation={3}>
                <div className={classes.bordi}>
                  <HeaderDomandaMoreAnswers IDDomanda={IDDomanda} domanda={domanda} />
                  <Grid container spacing={3}>

                    {/* Text Field domanda */}
                    <Grid item xs={12} sm={10}>
                      <TextField
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !bCheckDisabled) {
                            dispatch(setBModifyDomandaUnclicked(domanda.IDDomanda));
                            dispatch(enableAll());
                          }
                        }}
                        disabled={domanda.stateText}
                        value={domanda.Domanda}
                        fullWidth
                        onChange={(event) => {
                          const question = event.target.value;
                          if (question === '') {
                            dispatch(setBCheckDisabled());
                          } else if (bCheckDisabled === true) {
                            dispatch(setBCheckEnabled());
                          }
                          dispatch(modifyDomandaInObjectDomande(
                            { IDDomanda, question },
                          ));
                        }}
                      />

                    </Grid>
                    <ButtonsQuestionsAndAnswers domanda={domanda} />
                  </Grid>
                  {risTutteUguali ? <></>
                    : (
                      <Collapse in={!domanda.openCard}>

                        <div className={classes.marginBottom}>
                          <HeaderAnsMoreAns />
                        </div>
                        <AnswerLineEditor
                          id={domanda.IDDomanda}
                        />
                        {rightRepModify || confirmAddFormClicked
                          ? <EmptyAnswerLineEditor IDDomanda={domanda.IDDomanda} /> : <></>}

                      </Collapse>
                    )}
                </div>
                <div className={classes.bordi}>
                  {group
                    ? <DropDownListGroup IDDomanda={domanda.IDDomanda} /> : <></>}
                </div>
              </Card>
              {' '}
            </>
          ) : <></>}

      </div>
    );
  });
  return (
    <div>
      <NavQuestionsAndAnswers />

      <Collapse in={expanded}>
        <div className={classes.padding}>
          {intestazione
            ? <TextFieldIntestazioneQuesMoreAnswers /> : <></>}
          {rightRepModify || confirmAddFormClicked
            ? <EmptyAddQuestionMoreAnswers /> : <></>}

          {listDomandeAdded}

        </div>
      </Collapse>
    </div>
  );
};

export default QuestionsAndAnswersEditor;