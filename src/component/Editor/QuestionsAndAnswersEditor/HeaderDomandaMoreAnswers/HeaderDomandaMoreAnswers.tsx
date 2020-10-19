import React, { ReactElement, useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style';
import { domandaType, setDomandaFacoltativa, setDomandaLibera } from '../../../../store/slice/domandeAddFormSlice';
import { haveRepModifyRight } from '../../../../store/slice/rightsSlice';
import { isBConfirmAddFormClicked } from '../../../../store/slice/addFormSlice';

interface Props {IDDomanda : string, domanda : domandaType}

// Intestazione per le domande
const HeaderDomandaMoreAnswers = ({ IDDomanda, domanda }: Props):ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rightMod = useSelector(haveRepModifyRight);
  const confirmClicked = useSelector(isBConfirmAddFormClicked);
  const [disabled, setDisabled] = useState(false);

  if ((rightMod || confirmClicked) && disabled === true) {
    setDisabled(!disabled);
  } else if ((!rightMod && !confirmClicked) && disabled === false) {
    setDisabled(!disabled);
  }

  return (
    <span className={classes.bordi}>

      <Typography variant="h6" align="left">
        Domanda
        {' '}

        <FormControlLabel
          control={(
            <Checkbox
              disabled={disabled}
              checked={domanda.facoltativa}
              onChange={() => dispatch(setDomandaFacoltativa(IDDomanda))}
            />
        )}
          label="facoltativa"
        />
        <FormControlLabel
          control={(
            <Checkbox
              disabled={disabled}
              checked={domanda.libera}
              onChange={() => dispatch(setDomandaLibera(IDDomanda))}
            />
        )}
          label="libera"
        />

      </Typography>

    </span>
  );
};

export default HeaderDomandaMoreAnswers;
