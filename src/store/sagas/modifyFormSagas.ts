import { put, select, call } from 'redux-saga/effects';
import { risposteOfDomandaObject, ris2, ris1 } from '../slice/risposteAddFormSlice';

import { allReparti } from '../slice/rightsSlice';

import { dataRisultati } from '../slice/risultatiAddFormSlice';
import { domandeObject } from '../slice/domandeAddFormSlice';
import {
  IDRepartoSelected, IDForm,
} from '../slice/ddlEditorFormAndRepartiSlice';

import { updateForm } from '../api';
import { objectToArray } from '../../util';
import { buttonCancelAddFormClicked, nomeFormulario } from '../slice/addFormSlice';

export default function* saveModify() {
  try {
    const IDFormulario = yield select(IDForm);
    const GUID = yield select(IDRepartoSelected);
    const listRep = yield select(allReparti);

    // trovo il nome del reparto in base al formuario selezionato
    const findNameByID = (rep : any) => rep.sermednodeid === GUID || rep.unitid === GUID;
    const repSelected = listRep.find(findNameByID);
    const nomeReparto = repSelected.longname;

    const nomeForm = yield select(nomeFormulario);

    const objDomande = yield select(domandeObject);
    const objRisultati = yield select(dataRisultati);
    const listDomande = objectToArray(objDomande);
    const objRisposte = yield select(risposteOfDomandaObject);

    const listDomandeAndRisposte = listDomande.map((domanda : any) => {
      const { IDDomanda, Domanda, Tipo } = domanda;
      if (Tipo === 'a più risposte') {
        const listRisposte = objectToArray(objRisposte[IDDomanda]);
        const risposte = listRisposte?.map((risposta : any) => {
          const {
            IDRisposta, Risposta, Valore, type,
          } = risposta;
          return {
            IDRisposta, Risposta, Valore, type,
          };
        });
        return {
          IDDomanda, Domanda, Tipo, risposte,
        };
      }
      return {
        IDDomanda, Domanda, Tipo,
      };
    });
    const listRisultati = objectToArray(objRisultati);
    const ans1 = yield select(ris1);
    const ans2 = yield select(ris2);
    const { risposta1 } = ans1;
    const { risposta2 } = ans2;

    yield call(updateForm, IDFormulario, GUID, nomeReparto,
      nomeForm, listDomandeAndRisposte, listRisultati, risposta1, risposta2);

    yield put(buttonCancelAddFormClicked());
  } catch (error) {
    console.log('errore', error);
  }
}
