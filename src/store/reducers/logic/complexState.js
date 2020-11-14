export function cpxStateResetState(state) {
    state.autoSuggestion = "";
    state.inputValue = "";
    state.autocompleteList = [];
    state.dropdownSelector = -1;
    state.tempInputValue = "";
    state.tempAutoSuggestValue = "";
}
