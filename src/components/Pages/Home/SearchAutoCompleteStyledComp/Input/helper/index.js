import {
    setAutoSuggestion,
    setAutoSuggestionAndCaseSensitive,
} from "../../../../../../store/reducers/searchReducer";

const appendSuggestion = (currentValue, suggestion) => {
    const toAppend = suggestion.slice(currentValue.length);
    currentValue += toAppend;
    return currentValue;
};

export const autoSuggestionManager = (
    value,
    suggestedWord,
    autoSuggestion,
    dispatch
) => {
    const name = suggestedWord(value);

    if (name === autoSuggestion) return;
    else if (!name) dispatch(setAutoSuggestion(""));
    else {
        let appendedName = appendSuggestion(value, name);
        dispatch(setAutoSuggestionAndCaseSensitive(appendedName, name));
    }
};
