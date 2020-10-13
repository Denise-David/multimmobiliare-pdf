import { createSlice } from '@reduxjs/toolkit';
import { State } from '../store/store';

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    dialogSummaryOpen: false as boolean,
    dialogReturnDeviceOpen: false as boolean,
    dialogSearchOpen: false as boolean,
    dialogFormPatientOpen: false as boolean,
    dialogGroupOpen: false as boolean,
    dialogLabel: false as boolean,
    dialogFiltro: false as boolean,
  },
  reducers: {
    openDialogFiltro(state) {
      state.dialogFiltro = true;
    },
    closeDialogFiltro(state) {
      state.dialogFiltro = false;
    },
    openDialogLabel(state) {
      state.dialogLabel = true;
    },
    closeDialogLabel(state) {
      state.dialogLabel = false;
    },
    openDialogGroup(state) {
      state.dialogGroupOpen = true;
    },
    closeDialogGroup(state) {
      state.dialogGroupOpen = false;
    },
    openDialogSummary(state) {
      state.dialogSummaryOpen = true;
    },
    closeDialogSummaryAndSave(state) {
      state.dialogSummaryOpen = false;
    },
    closeDialogSummary(state) {
      state.dialogSummaryOpen = false;
    },
    openReturnDeviceDialog(state) {
      state.dialogReturnDeviceOpen = true;
    },
    closeReturnDeviceDialog(state) {
      state.dialogReturnDeviceOpen = false;
    },
    openDialogSearch(state) {
      state.dialogSearchOpen = true;
    },
    closeDialogSearch(state) {
      state.dialogSearchOpen = false;
    },
    openDialogFormPatient(state) {
      state.dialogFormPatientOpen = true;
    },
    closeDialogFormPatient(state) {
      state.dialogFormPatientOpen = false;
    },
  },
});

export const closeAndFilterDialog = ():{type:string} => ({
  type: 'CLOSE_AND_FILTER_DIALOG',

});

export const dialogFiltro = (state : State):boolean => state.dialog.dialogFiltro;
export const dialogLabel = (state : State):boolean => state.dialog.dialogLabel;
export const dialogGroupOpen = (state : State):boolean => state.dialog.dialogGroupOpen;
export const dialogFormPatientOpen = (state : State):boolean => state.dialog.dialogFormPatientOpen;
export const dialogSearchOpen = (state : State):boolean => state.dialog.dialogSearchOpen;
export const
  dialogReturnDeviceOpen = (state : State):boolean => state.dialog.dialogReturnDeviceOpen;
export const dialogSummaryOpen = (state : State):boolean => state.dialog.dialogSummaryOpen;
export const {
  openDialogSummary, closeDialogSummary,
  closeDialogSummaryAndSave, openReturnDeviceDialog,
  closeReturnDeviceDialog, openDialogSearch, closeDialogSearch,
  closeDialogFormPatient,
  openDialogFormPatient, openDialogGroup, closeDialogGroup,
  openDialogLabel, closeDialogLabel, openDialogFiltro, closeDialogFiltro,
} = dialogSlice.actions;
export default dialogSlice.reducer;
