/* eslint-disable no-underscore-dangle */
import {
  Button, Divider, Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDialogLabel } from '../../../store/slice/dialogSlice';
import {
  familynameCercato, formNoLabel, nameCercato, setSelected,
} from '../../../store/slice/interfacciaAmmSlice';
import SnackbarEtichettaInesistente from '../SnackbarEtichettaInesistente/SnackbarEtichettaInesistente';

import useStyles from './style';

const FormularioLine = () => {
  const noLabelForm = useSelector(formNoLabel);
  const classes = useStyles();
  const dispatch = useDispatch();
  const nomeCercato = useSelector(nameCercato);
  const cognomeCercato = useSelector(familynameCercato);
  const listForm = noLabelForm.map((form : any) => {
    const nome : string = form.paziente.givenname.toLowerCase();
    const cognome :string = form.paziente.familyname.toLowerCase();
    const nomeCognome = `${form.paziente.givenname} ${form.paziente.familyname}`;
    const { reparto } = form;
    const { formulario } = form;
    const IDForm = form._id;
    if (nome.includes(nomeCercato.toLowerCase())
     && cognome.includes(cognomeCercato.toLowerCase())) {
      return (
        <>
          <SnackbarEtichettaInesistente />
          <Divider />

          <div className={classes.margin}>
            <Typography variant="body1" key={form._id}>
              {form.reparto}
              {' '}
              {form.formulario}
              {' '}
              {form.paziente.givenname}
              {' '}
              {form.paziente.familyname}

            </Typography>
          </div>
          <div className={classes.margin}>
            <Button
              color="primary"
              onClick={() => {
                dispatch(setSelected({
                  nomeCognome, formulario, reparto, IDForm,
                }));
                dispatch(openDialogLabel());
              }}
              variant="contained"
            >
              Aggiungi etichetta

            </Button>
          </div>
          <Divider />
        </>
      );
    } return (<></>);
  });
  return (
    <div>{listForm}</div>
  );
};

export default FormularioLine;
