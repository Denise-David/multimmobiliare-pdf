import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { newPatientInfo, changePatientValue, isDisable } from '../../store/slice/patientDataSlice';

const TextLastname = () => {
  const dataEtichetta = useSelector(newPatientInfo);
  const disabled = useSelector(isDisable);
  const dispatch = useDispatch();
  return (
    <TextField
      fullWidth
      disabled
      label="Medico inviante"
      value={dataEtichetta.nameDoctor}

      onChange={(event) => {
        const { value } = event.target;
        const name = 'nameDoctor';
        dispatch(changePatientValue({ name, value }));
      }}
    />
  );
};

export default TextLastname;
