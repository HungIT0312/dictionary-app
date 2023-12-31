import { createSlice } from "@reduxjs/toolkit";
import {
  createNewWL,
  deleteExistWordList,
  getAllWL,
  getWLById,
  getWordListsDefault,
  getWordListsPublic,
  updateWl,
} from "./wordLists-thunk";

const wordListsSlice = createSlice({
  name: "wordLists",
  initialState: {
    loading: false,
    error: null,
    messageDel: null,
    wordLists: [],
    selectedWordList: {},
    wordListsPublic: [],
    wordListsDefault: [],
    searchWordListResult: [],
  },
  reducers: {
    // deleteWL: (state, action) => {
    //   state.messageDel = null;
    //   const index = state.wordLists.findIndex((wl) => wl.id === action.payload);
    //   if (index !== -1) {
    //     state.wordLists.splice(index, 1);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      //==========================================================GetAllWl
      .addCase(getAllWL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWL.fulfilled, (state, action) => {
        state.loading = false;
        state.wordLists = action.payload;
        state.messageDel = null;
      })
      .addCase(getAllWL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================GetWlById
      .addCase(getWLById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWLById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWordList = action.payload;
      })
      .addCase(getWLById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //========================================================== getDefault
      .addCase(getWordListsDefault.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWordListsDefault.fulfilled, (state, action) => {
        state.loading = false;
        state.wordListsDefault = action.payload;
      })
      .addCase(getWordListsDefault.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================Public
      .addCase(getWordListsPublic.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWordListsPublic.fulfilled, (state, action) => {
        state.loading = false;
        state.wordListsPublic = action.payload;
      })
      .addCase(getWordListsPublic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================Create
      .addCase(createNewWL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewWL.fulfilled, (state, action) => {
        state.loading = false;
        state.wordLists.push(action.payload);
        // console.log(action.payload);

        state.wordListsDefault.push(action.payload);
      })
      .addCase(createNewWL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================Delete
      .addCase(deleteExistWordList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistWordList.fulfilled, (state, action) => {
        const index = state.wordLists.findIndex(
          (wl) => wl.id === action.payload
        );
        const defaultIndex = state.wordListsDefault.findIndex(
          (wl) => wl.id === action.payload
        );
        state.wordLists.splice(index, 1);
        state.wordListsDefault.splice(defaultIndex, 1);
        state.loading = false;
        state.messageDel = action.payload;
      })
      .addCase(deleteExistWordList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //==========================================================update
      .addCase(updateWl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWl.fulfilled, (state, action) => {
        const updateWordList = (array, payload, logMessage) => {
          const index = array.findIndex((wl) => wl.id === payload.id);
          if (index !== -1) {
            array[index] = payload;
          } else {
            console.log(`No wordlist found in ${logMessage}`);
          }
        };
        updateWordList(state.wordLists, action.payload, "wordLists");
        updateWordList(
          state.wordListsDefault,
          action.payload,
          "wordListsDefault"
        );
        state.loading = false;
      })
      .addCase(updateWl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export const { deleteWordList } = wordListsSlice.actions;
export default wordListsSlice.reducer;
