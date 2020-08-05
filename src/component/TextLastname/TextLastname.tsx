import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { allDataEtichetta, changePatientValue, isDisable } from '../../store/slice/patientDataSlice';

const TextLastname = () => {
  const dataEtichetta = useSelector(allDataEtichetta);
  const disabled = useSelector(isDisable);
  const dispatch = useDispatch();

  return (
    <TextField
      fullWidth
      disabled={disabled}
      style={{ marginLeft: 8 }}
      label="Cognome"
      value={dataEtichetta.familyname}

      onChange={(event) => {
        const { value } = event.target;
        const name = 'familyname';
        dispatch(changePatientValue({ name, value }));
      }}
    />

  );
};

export default TextLastname;
