import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

const selectUi = (state: RootState) => state.ui;

export const youtubeList = createSelector(
  selectUi,
  (ui) => ui.youtubeList,
);
