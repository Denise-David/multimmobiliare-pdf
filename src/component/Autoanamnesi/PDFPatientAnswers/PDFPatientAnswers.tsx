/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  setNumEtichetta, setIDFormRisposte, patientAnswers, infoReparto,
} from '../../../store/slice/patientFormPDFSlice';
import useStyles from './style';

const PDFPatientAnswers = () => {
  // eslint-disable-next-line no-restricted-globals
  const parsedText = queryString.parse(location.search);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const parsed = queryString.parse(location.search);

    dispatch(setNumEtichetta(parsed.etichetta));
    dispatch(setIDFormRisposte(parsed.ID));
    dispatch({ type: 'initPDFPatientAnswers' });
  }, [dispatch]);

  const repartoInfo = useSelector(infoReparto);
  const answersArray = useSelector(patientAnswers);

  let sommaRisposte = 0;
  // creo lista di risposte
  const listRisposte = answersArray.risposte ? answersArray.risposte.map((risposta :any) => {
    const indexPuntoDomanda = risposta.domanda ? risposta.domanda.indexOf('?') : -1;
    const noPuntoDiDomanda = indexPuntoDomanda !== -1
      ? risposta.domanda.substring(0, indexPuntoDomanda)
      : risposta.domanda;
    sommaRisposte += risposta.valore;

    // creo la lista di date
    const arrayDate = risposta.date ? risposta.date.map((data: any) => (
      <Typography key={data.idRisposta}>
        {data.testoData}
        {': '}
        {format(new Date(data.dataFormattata), 'dd.MM.yyyy')}
      </Typography>
    )) : <></>;

    return (
      <>
        {risposta.idRisposta
          ? (
            <div className={classes.cornice}>

              <Typography variant="body1">
                {risposta.domanda}
                {' '}
                {risposta.testoLibero ? risposta.testoLibero : <></>}
              </Typography>
              <Typography variant="body1" align="right">
                {risposta.testoRisposta}
                {arrayDate}
              </Typography>
            </div>
          ) : (
            <>
              {risposta.valore === repartoInfo.risposta1
                ? (
                  <div className={classes.cornice}>
                    <Typography variant="body1">
                      { noPuntoDiDomanda }
                      {' '}
                      {risposta.testoLibero ? risposta.testoLibero : <></>}

                    </Typography>
                  </div>
                ) : <></>}
            </>
          )}
      </>
    );
  }) : <></>;
  // creo lista risultati
  const risultatiArray = repartoInfo.Risultati ? Object.keys(repartoInfo.Risultati).map((key) => {
    const risultato = repartoInfo.Risultati[key];
    return risultato;
  }) : [];
  const listRisultati = risultatiArray ? risultatiArray.map((risultato :any) => {
    // Seleziono risultato risultante in base alla somma dei valori delle risposte
    if (sommaRisposte >= risultato.valoreMin && sommaRisposte <= risultato.valoreMax) {
      return (
        <div>
          {risultato.testoAnamnesi}
        </div>
      );
    }
    return (
      <div />
    );
  }) : <> </>;

  return (
    <div className={classes.margini}>
      <Typography variant="body2">
        Etichetta :
        {' '}
        {parsedText.etichetta}
        <br />
        ID formulario risposte :
        {' '}
        {parsedText.ID}
        <br />
        Reparto :
        {' '}
        {repartoInfo.Reparto}
      </Typography>
      <Typography className={classes.titolo} variant="h4">
        Risposte paziente
      </Typography>
      <Typography variant="h5" align="right">
        {answersArray.givenname}
        {' '}
        {answersArray.familyname}
      </Typography>
      <hr />
      {listRisposte}
      <Typography className={classes.risultatoSpace} variant="h6">
        Risultato:
        {' '}
        <span className={classes.center}>
          {listRisultati}
        </span>
      </Typography>

    </div>
  );
};

export default PDFPatientAnswers;