import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

const selectUi = (state: RootState) => state.ui;

export const selectMobile = createSelector(selectUi, (ui) => ui.isMobile);
export const selectActivateLnb = createSelector(
  selectUi,
  (ui) => ui.activateLnb,
);
