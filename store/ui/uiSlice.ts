import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type initState = {
  youtubeList: API[] | [];
};

interface API {
  app: string
  author: string
  author_image: string
  createdAt: string
  id: string
  korean: boolean
  published_at: string
  tag: string
  thumbnail: string
  title: string
  updatedAt: string
  upload_date: string
  view_count: number
  youtube_ids: string
  __v: number
  _id: string
}

const initialState:initState  = {
  youtubeList: [],
}
export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setYoutubeList: (state, action: PayloadAction<API[]>) => {
      state.youtubeList = action.payload;
    },
  },
});
