import produce from "immer";
import tagList from "../mocks/tagsMock";
import selectFilters from "../mocks/selectFilterMock";
import { onDeleteHandler, manageTagList } from "./logic/tags";
import menageSelector from "./logic/moveSelector";
import { cpxStateResetState } from "./logic/complexState";
//! ****************************************************************//
//!ACTIONTYPES CONSTANTS
const DELETE_TAG = "DELETE_TAG";
const POP_TAG = "POP_TAG";
const ADD_TAG = "ADD_TAG";
const MOVE_SELECTOR = "MOVE_SELECTOR";
const SET_SELECTOR = "SET_SELECTOR";
const SET_AUTO_SUGGESTION = "SET_AUTO_SUGGESTION";
const SET_AUTOCOMPLETE_LIST = "SET_AUTOCOMPLETE_LIST";
const SET_INPUT_VALUE = "SET_INPUT_VALUE";
const CLEAR_INPUT = "CLEAR_INPUT";
const RESET_STATE = "RESET_STATE";
const SET_ALL_INPUTS = "SET_ALL_INPUTS";
const FETCH_AUTOCOMPLETE_LIST = "FETCH_AUTOCOMPLETE_LIST";
const CLEAR_AUTOCOMPLETE_LIST = "CLEAR_AUTOCOMPLETE_LIST";
const SET_CASE_SENSITIVE_SUGGESTION = "FETCH_AUTOSUGGEST";
const SET_TEMP_INPUT_VALUE = "SET_TEMP_INPUT_VALUE";
const SET_SELECT_FILTER = "SET_SELECT_FILTERS";
const TOGGLE_FILTER_LIST = "TOGGLE_FILTER_LIST";
const ASSIGN_INPUT_REF = "ASSIGN_INPUT_REF";
const RESET_STATE_AND_FOCUS_INPUT = "RESET_STATE_AND_FOCUS_INPUT";
const ON_BLUR_HIDE_FILTER_LIST = "ON_BLUR_HIDE_FILTER_LIST";
const ON_SUBMIT_MAIN_SEARCH = "ON_SUBMIT_MAIN_SEARCH";
//input

const SET_AUTOSUGGESTION_AND_CASE_SENSITIVE =
    "SET_AUTOSUGGESTION_AND_CASE_SENSITIVE";

//ul autocomplete list
const AUTOCOMPLETE_LIST_ITEM_CLICK = "AUTOCOMPLETE_LIST_ITEM_CLICK";
const AUTOCOMPLETE_LIST_MOUSE_ENTER = "AUTOCOMPLETE_LIST_MOUSE_ENTER";

//! ****************************************************************//
//!ACTIONS

export function deleteTag(id) {
    return { type: DELETE_TAG, payload: id };
}

export function popTag() {
    return { type: POP_TAG };
}

export function addTag(tagName) {
    return { type: ADD_TAG, payload: tagName };
}

export function setSelectFilter(value) {
    return { type: SET_SELECT_FILTER, payload: value };
}

export function moveSelector(key) {
    return { type: MOVE_SELECTOR, payload: key };
}

export function setSelector(index) {
    return { type: SET_SELECTOR, payload: index };
}

export function setInputValue(value) {
    return { type: SET_INPUT_VALUE, payload: value };
}

export function assignInputRef(value) {
    return { type: ASSIGN_INPUT_REF, payload: value };
}

export function setAutoSuggestion(value) {
    return { type: SET_AUTO_SUGGESTION, payload: value };
}

export function setAutoSuggestionAndCaseSensitive(appendedValue, value) {
    return {
        type: SET_AUTOSUGGESTION_AND_CASE_SENSITIVE,
        payload: { appendedValue, value },
    };
}

export function setAllInputs(value) {
    return { type: SET_ALL_INPUTS, payload: value };
}

export function onBlurHideFilterList() {
    return { type: ON_BLUR_HIDE_FILTER_LIST };
}

export function clearAllInputs() {
    return { type: CLEAR_INPUT };
}

export function setAutocompleteList(value) {
    return { type: SET_AUTOCOMPLETE_LIST, payload: value };
}

export function clearAutocompleteList() {
    return { type: CLEAR_AUTOCOMPLETE_LIST };
}

export function resetStateAndFocusInput() {
    return { type: RESET_STATE_AND_FOCUS_INPUT };
}

export function fetchAutoCompleteList(value) {
    return { type: FETCH_AUTOCOMPLETE_LIST, payload: value };
}

export function setTempInputValue(value) {
    return { type: SET_TEMP_INPUT_VALUE, payload: value };
}

export function toggleFilterList() {
    return { type: TOGGLE_FILTER_LIST };
}

//? Autocomplete actions

export function autocompleteListItemClick(value) {
    return {
        type: AUTOCOMPLETE_LIST_ITEM_CLICK,
        payload: value,
    };
}

export function autocompleteListMouseEnter(value) {
    return {
        type: AUTOCOMPLETE_LIST_MOUSE_ENTER,
        payload: value,
    };
}

export function onSubmitMainSearch() {
    return {
        type: ON_SUBMIT_MAIN_SEARCH,
    };
}
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
//!REDUCER
export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    return produce(state, (draft) => {
        switch (type) {
            case ADD_TAG:
                manageTagList(payload, draft.tagList);
                cpxStateResetState(draft);
                break;
            case DELETE_TAG:
                onDeleteHandler(draft.tagList, payload);
                break;
            case POP_TAG:
                draft.tagList.pop();
                break;
            case MOVE_SELECTOR:
                menageSelector(draft, payload);
                break;
            case SET_SELECTOR:
                draft.dropdownSelector = payload;
                break;
            case SET_AUTO_SUGGESTION:
                draft.autoSuggestion = payload;
                break;

            case SET_AUTOSUGGESTION_AND_CASE_SENSITIVE:
                draft.autoSuggestion = payload.appendedValue;
                draft.caseSensitiveFillSuggestion = payload.value;
                break;
            case SET_AUTOCOMPLETE_LIST:
                draft.autocompleteList = payload;
                draft.dropdownSelector = -1;
                draft.tempInputValue = "";
                break;
            case CLEAR_AUTOCOMPLETE_LIST:
                draft.autocompleteList = [];
                break;
            case SET_INPUT_VALUE:
                draft.inputValue = payload;
                break;
            case RESET_STATE_AND_FOCUS_INPUT:
                cpxStateResetState(draft);
                draft.inputRef.focus();
                break;
            case SET_ALL_INPUTS:
                draft.autoSuggestion = payload;
                draft.inputValue = payload;
                break;
            case CLEAR_INPUT:
                draft.autoSuggestion = "";
                draft.inputValue = "";
                draft.dropdownSelector = -1;
                draft.tempInputValue = "";

                break;

            case SET_SELECT_FILTER:
                const foundedSelected = draft.selectFilterList.find(
                    (item) => item.id === +payload
                );
                if (foundedSelected) {
                    draft.selectFilterList.map((item) => {
                        if (item.selected === true) item.selected = false;
                        return item;
                    });
                    foundedSelected.selected = true;
                    draft.selectedFilter = foundedSelected;
                }

                draft.showFilterList = false;

                break;

            case SET_CASE_SENSITIVE_SUGGESTION:
                draft.caseSensitiveFillSuggestion = payload;
                break;

            case SET_TEMP_INPUT_VALUE:
                draft.tempInputValue = draft.inputValue;
                break;

            case TOGGLE_FILTER_LIST:
                draft.showFilterList = !draft.showFilterList;
                break;

            case ON_BLUR_HIDE_FILTER_LIST:
                draft.showFilterList = false;
                break;

            case ASSIGN_INPUT_REF:
                draft.inputRef = payload;
                break;
            //?autocompleteList
            case AUTOCOMPLETE_LIST_ITEM_CLICK:
                draft.autocompleteList = [];
                draft.inputValue = payload.target.innerText;
                draft.inputRef.focus();
                break;

            case AUTOCOMPLETE_LIST_MOUSE_ENTER:
                draft.tempInputValue = draft.inputValue;
                draft.autoSuggestion = "";
                draft.dropdownSelector = payload;
                break;

            case ON_SUBMIT_MAIN_SEARCH:
                const obj = {
                    searchTerm: draft.inputValue,
                    searchBy: draft.selectedFilter,
                    filters: draft.tagList,
                };
                break;
            default:
                break;
        }
    });
}
