import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { isBCheckDisabled } from '../../../../../store/slice/domandeAddFormSlice';
import {
  setAnswer, setValore, typeAnswer, valore, answer,
  setAddRispostaClicked, setAddRispostaUnclicked, addRisposta,
  resetRispostaType, stateAddedRisposta,
} from '../../../../../store/slice/risposteAddFormSlice';

interface Props{ IDDomanda: string}

const TextFieldEmptyAnswerLine = ({ IDDomanda }:Props) => {
  const dispatch = useDispatch();
  const bCheckDisabled = useSelector(isBCheckDisabled);
  const typeRis = useSelector(typeAnswer);
  const rispostaText = useSelector(answer);
  const valoreText = useSelector(valore);
  const stateTextField = useSelector(stateAddedRisposta);
  const NON_DIGIT = '/[^0-9]/g';
  if (typeRis[IDDomanda] !== 'data') {
    return (
      <>

        <Grid item xs={12} sm={7}>

          <TextField

            onKeyDown={(e) => {
              if (e.key === 'Enter' && !stateTextField[IDDomanda]) {
                dispatch(addRisposta(IDDomanda));
                dispatch(resetRispostaType(IDDomanda));
              }
            }}
            placeholder="risposta"
            value={rispostaText[IDDomanda] || ''}
            onChange={(event) => {
              const { value } = event.target;
              if (value === '') {
                dispatch(setAddRispostaUnclicked(IDDomanda));
              } else {
                dispatch(setAddRispostaClicked(IDDomanda));
              }
              dispatch(setAnswer({ IDDomanda, value }));
            }}

            id="standard-basic"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={1}>
          <TextField
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !stateTextField[IDDomanda]) {
                dispatch(addRisposta(IDDomanda));
                dispatch(resetRispostaType(IDDomanda));
              }
            }}
            placeholder="valore"
            value={valoreText[IDDomanda] || ''}
            onChange={(event) => {
              const { value } = event.target;
              if (value !== '') {
                // eslint-disable-next-line radix
                const intValue = parseInt(value.toString().replace(NON_DIGIT, '0'));
                dispatch(setValore({ IDDomanda, intValue }));
              } else {
                const intValue = '0';
                dispatch(setValore({ IDDomanda, intValue }));
              }
            }}
            id="standard-basic"
            fullWidth
          />
        </Grid>

      </>
    );
  }
  return (
    <>
      <Grid item xs={12} sm={7}>

        <TextField
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !stateTextField[IDDomanda]) {
              dispatch(addRisposta(IDDomanda));
              dispatch(resetRispostaType(IDDomanda));
            }
          }}
          placeholder="testo data"
          value={rispostaText[IDDomanda] || ''}
          onChange={(event) => {
            const { value } = event.target;
            if (value === '') {
              dispatch(setAddRispostaUnclicked(IDDomanda));
            } else if (bCheckDisabled === true) {
              dispatch(setAddRispostaClicked(IDDomanda));
            }
            dispatch(setAnswer({ IDDomanda, value }));
          }}
          id="standard-basic"
          fullWidth
        />

      </Grid>
      <Grid item xs={12} sm={1} />
    </>
  );
};

export default TextFieldEmptyAnswerLine;