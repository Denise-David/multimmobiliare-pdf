/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable react/prefer-stateless-function */
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import store from './store/store/store';
import theme from '../theme';
import AnnuncioPDF from './component/AnnuncioPDF/AnnuncioPDF';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>

        <AnnuncioPDF />

      </Provider>
    </ThemeProvider>
  );
}
