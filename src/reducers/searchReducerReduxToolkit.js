import tagList from "../../mocks/tagsMock";
import selectFilters from "../../mocks/selectFilterMock";
import { manageTagList } from "./logic/tags";
import menageSelector from "./logic/moveSelector";
import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { resetStateToInitial } from "./logic/complexState";
import { createAction, createReducer } from "@reduxjs/toolkit";
//! ****************************************************************//

//?
const deleteTag = createAction("tags/deleteTag");
const popTag = createAction("tags/popTag");
const addTag = createAction("tags/addTag");
//?
const moveSelector = createAction("autocomplete/moveSelector");
const setSelector = createAction("autocomplete/setSelector");
const setAutocompleteList = createAction("autocomplete/setAutocompleteList");
const fetchAutoCompleteList = createAction(
    "autocomplete/fetchAutoCompleteList"
);
const clearAutocompleteList = createAction(
    "autocomplete/clearAutocompleteList"
);
const autocompleteListItemClick = createAction(
    "autocomplete/autocompleteListItemClick"
);
const autocompleteListMouseEnter = createAction(
    "autocomplete/autocompleteListMouseEnter"
);

//?
const setAutoSuggestion = createAction("input/setAutoSuggestion");
const setInputValue = createAction("input/setInputValue");
const clearInput = createAction("input/clearInput");
const resetState = createAction("input/resetState");
const setAllInputs = createAction("input/setAllInputs");
const setCaseSensitiveSuggestion = createAction(
    "input/setCaseSensitiveSuggestion"
);
const setTempInputValue = createAction("input/setTempInputValue");
const focusInput = createAction("input/focusInput");
const assignInputRef = createAction("input/assignInputRef");
const setAutoSuggestionAndCaseSensitive = createAction(
    "input/setAutoSuggestionAndCaseSensitive"
);
//?
const setSelectFilter = createAction("select/setSelectFilter");
const toggleFilterList = createAction("select/toggleFilterList");
//!ACTIONTYPES CONSTANTS

//! ****************************************************************//
//! INITIAL STATE
const initialState = {
    tagList: tagList,
    dropdownList: [],
    autocompleteList: [],
    selectFilterList: selectFilters,
    selectedFilter: selectFilters.find((item) => item.selected === true),
    showFilterList: false,
    tempInputValue: "",
    tempAutoSuggestValue: "",
    inputValue: "",
    inputRef: null,
    autoSuggestion: "",
    caseSensitiveFillSuggestion: "",
    dropdownSelector: -1,
    keyCodes: { 40: 1, 38: -1 },
    manageTagList: () => {},
    onDeleteHandler: () => {},
    toggleTagHandler: () => {},
    moveSelector: () => {},
    setInputValue: () => {},
    setAutoSuggestion: () => {},
    setAutocompleteList: () => {},
};
//! ****************************************************************//
function* getAutoCompleteList(action) {
    const {
        payload: { value },
    } = action;
    let finished = yield axios
        .get("https://api.npoint.io/b12a6e7e85e8e63d54a2")
        .then(({ data }) => {
            return data.filter((item) => {
                return item.name.toLowerCase().startsWith(value.toLowerCase());
            });
        });
    yield (finished = finished.slice(0, 10));

    yield put(setAutocompleteList(finished));
}

const searchReducer = createReducer(initialState, (builders) => {
    builders
        .addCase(deleteTag, (state, action) => {
            const id = action.payload.id;
            const index = state.tagList.findIndex((tag) => tag.id === id);
            state.splice(index, 1);
        })

        .addCase(popTag, (state, action) => {
            state.tagList.pop();
        })

        .addCase(addTag, (state, action) => {
            const { tagName } = action.payload;
            manageTagList(tagName, state.tagList);
            resetStateToInitial(state);
        })
        .addCase(setAutocompleteList, (state, action) => {
            state.autocompleteList = action.payload.value;
            state.dropdownSelector = -1;
            state.tempInputValue = "";
        })
        .addCase(clearAutocompleteList, (state, action) => {
            state.autocompleteList = [];
        })
        .addCase(autocompleteListItemClick, (state, action) => {
            state.autocompleteList = [];
            state.inputValue = action.payload.value;
            state.inputRef.focus();
        })
        .addCase(autocompleteListMouseEnter, (state, action) => {
            state.tempInputValue = state.inputValue;
            state.autoSuggestion = "";
            state.dropdownSelector = action.payload.value;
        })
        .addCase(resetState, (state, action) => {
            resetStateToInitial(state);
        })
        .addCase(setInputValue, (state, action) => {
            state.inputValue = action.payload.value;
        })
        .addCase(setAllInputs, (state, action) => {
            state.autoSuggestion = action.payload.value;
            state.inputValue = action.payload.value;
        })
        .addCase(clearInput, (state, action) => {
            state.autoSuggestion = "";
            state.inputValue = "";
            state.dropdownSelector = -1;
            state.tempInputValue = "";
        })
        .addCase(setTempInputValue, (state, action) => {
            state.tempInputValue = state.inputValue;
        })
        .addCase(focusInput, (state, action) => {
            state.inputRef.focus();
        })
        .addCase(assignInputRef, (state, action) => {
            state.inputRef = action.payload.value;
        })
        .addCase(setAutoSuggestion, (state, action) => {
            state.autoSuggestion = action.payload.value;
        })
        .addCase(setAutoSuggestionAndCaseSensitive, (state, action) => {
            state.autoSuggestion = action.payload.appendedValue;
            state.caseSensitiveFillSuggestion = action.payload.value;
        })
        .addCase(setCaseSensitiveSuggestion, (state, action) => {
            state.caseSensitiveFillSuggestion = action.payload.value;
        })
        .addCase(moveSelector, (state, action) => {
            const key = action.payload.key;
            menageSelector(state, key);
        })
        .addCase(setSelector, (state, action) => {
            state.dropdownSelector = action.payload.index;
        })
        .addCase(toggleFilterList, (state, action) => {
            state.showFilterList = !state.showFilterList;
        })
        .addCase(setSelectFilter, (state, action) => {
            const foundedSelected = state.selectFilterList.find(
                (item) => item.id === +action.payload.value
            );
            if (foundedSelected) {
                state.selectFilterList.map((item) => {
                    if (item.selected === true) item.selected = false;
                    return item;
                });
                foundedSelected.selected = true;
                state.selectedFilter = foundedSelected;
            }

            state.showFilterList = false;
        });
});

export default searchReducer;
