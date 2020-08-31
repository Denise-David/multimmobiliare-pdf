import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import App from './view/Barcode/App';
import store from './store/store/store';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import FormPaziente from './view/FormPaziente/FormPaziente';
import Editor from './view/Editor/Editor';
import PDFPatientData from './component/PDFPatientData/PDFPatentData';
import PDFPatientAnswers from './component/PDFPatientAnswers/PDFPatientAnswers';
import EtichettaQrCode from './component/EtichettaQRCode/EtichettaQrCode';

// const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
let classCounter = 0;

const generateClassName = (rule : any, styleSheet : any) => {
  classCounter += 1;

  // if (process.env.NODE_ENV === 'production') {
  //   console.log('classCounter');
  return `c${classCounter}`;
  // }

  // if (styleSheet && styleSheet.options.classNamePrefix) {
  //   let prefix = styleSheet.options.classNamePrefix;
  //   // Sanitize the string as will be used to prefix the generated class name.
  //   prefix = prefix.replace(escapeRegex, '-');
  //   console.log('prefix', prefix);

  //   if (prefix.match(/^Mui/)) {
  //     return `${prefix}-${rule.key}`;
  //   }
  //   console.log('prefix-rulekey-classCounter');
  //   return `${prefix}-${rule.key}-${classCounter}`;
  // }
  // console.log('rulekey-classCounter');
  // return `${rule.key}-${classCounter}`;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>

          <CssBaseline />
          <Router basename={process.env.REACT_APP_BASENAME}>
            <Route path="/editor">
              <Editor />
            </Route>

            <Switch>
              <Route path="/form">
                <FormPaziente />
              </Route>

              <Route path="/home">
                <App />
              </Route>

              <Route path="/pdfDatiPaziente">
                <PDFPatientData />
              </Route>

              <Route path="/pdfRispostePaziente">
                <PDFPatientAnswers />
              </Route>

              <Route path="/QRCode">
                <EtichettaQrCode />
              </Route>
            </Switch>

          </Router>

        </MuiThemeProvider>
      </StylesProvider>

    </Provider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
