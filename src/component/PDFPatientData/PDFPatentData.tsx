import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { setIDFormRisposte, oldPatientData, newPatientData } from '../../store/slice/patientFormPDFSlice';
import useStyles from './style';
import PatientNoDoctorData from '../PatientNoDoctorData/PatientNoDoctorData';

const PDFPatientData = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // eslint-disable-next-line no-restricted-globals
  const parsedText = queryString.parse(location.search);
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const parsed = queryString.parse(location.search);
    dispatch(setIDFormRisposte(parsed.ID));
    dispatch({ type: 'initPDFPatientData' });
  }, [dispatch]);
  const oldDataPatient = useSelector(oldPatientData);
  const newDataPatient = useSelector(newPatientData);

  return (
    <div className={classes.margini}>
      <Typography variant="body2">
        ID formulario risposte :
        {' '}
        {parsedText.ID}
      </Typography>
      <Typography className={classes.titolo} variant="h4">
        Dati paziente
        <hr />
      </Typography>
      <PatientNoDoctorData />
      <br />
      <Typography variant="subtitle1">

        <br />
        Cassa malati :
        {' '}
        {oldDataPatient.insuranceCoversName}
        { oldDataPatient.insuranceCoversName === newDataPatient.insuranceCoversName ? <></>
          : (
            <span className={classes.spazio}>
              NUOVA Cassa malati :
              {' '}
              { newDataPatient.insuranceCoversName}
            </span>

          ) }

      </Typography>
      <hr />
    </div>

  );
};

export default PDFPatientData;
