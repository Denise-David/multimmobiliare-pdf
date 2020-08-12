import { select, put, call } from 'redux-saga/effects';
import {
  IDFormRisposte, getPatientAnswer, numEtichetta, getRepartoInfo,
} from '../slice/patientFormPDFSlice';

import { getRisposteFormPazienti, getEtichettaData, fetchRepartoFormByGUID } from '../api';

export default function* initPDFPatientAnswers(action : any) {
  try {
    const IDForm = yield select(IDFormRisposte);
    const etichettaNum = yield select(numEtichetta);
    const dataEtichetta = yield call(getEtichettaData, etichettaNum);

    const { data = {} } = dataEtichetta;
    const { hcase = {} } = data;
    const { actualWardGUID = '' } = hcase;

    const dataReparto = yield call(fetchRepartoFormByGUID, actualWardGUID);

    const datiReparto = dataReparto.data;
    const {
      Reparto = '', Risposte = {}, tipo = '', Risultati = {},
    } = datiReparto[0];
    const { risposta1 = '' } = Risposte;

    const infoReparto = {
      Risultati,
      Reparto,
      tipo,
      risposta1,
    };

    yield put(getRepartoInfo(infoReparto));

    const dataFormPaziente = yield call(getRisposteFormPazienti, IDForm);
    const { paziente = {}, risposte = {} } = dataFormPaziente;
    const { givenname = '', familyname = '' } = paziente;

    const PDFRisposte = {
      givenname,
      familyname,
      risposte,

    };

    yield put(getPatientAnswer(PDFRisposte));
  } catch (error) {
    console.log(error);
  }
}