//! bez vracanja na pocetak na kraju liste
//! deprecated
// export default function moveSelector(state, key) {
//     const keyCodes = { ArrowDown: 1, ArrowUp: -1 };

//     let { dropdownSelector: current } = state;
//     if (current === -1) {
//         state.tempInputValue = state.inputValue;
//     }
//     current += keyCodes[key];
//     if (current >= -1 && current < state.autocompleteList.length) {
//         state.dropdownSelector = current;
//         if (current === -1) {
//             state.inputValue = state.tempInputValue;
//             state.autoSuggestion = state.tempInputValue;
//         } else {
//             state.inputValue = state.autocompleteList[current].name;
//             state.autoSuggestion = "";
//         }
//     }
// }

export default function moveSelector(state, key) {
    const keyCodes = { ArrowDown: 1, ArrowUp: -1 };
    let {
        dropdownSelector: current,
        tempInputValue,
        tempAutoSuggestValue,
        inputValue,
        autocompleteList,
    } = state;

    if (current === -1 && tempInputValue !== inputValue) {
        state.tempInputValue = inputValue;
        state.tempAutoSuggestValue = state.autoSuggestion;
    }

    current += keyCodes[key];
    //ako je selektor -1 i pritisnuta je strelica na gore
    //setujemo selektor na poslednji list item
    // i obrnuto u else if
    if (current === -1) {
        state.inputValue = tempInputValue;
        state.autoSuggestion = tempAutoSuggestValue;
        state.dropdownSelector = current;
    } else if (current < -1) {
        current = autocompleteList.length - 1;
        state.dropdownSelector = current;
        state.inputValue = autocompleteList[current].name;
        state.autoSuggestion = autocompleteList[current].name;
    } else if (current > autocompleteList.length - 1) {
        current = -1;
        state.dropdownSelector = -1;
        state.inputValue = tempInputValue;
        state.autoSuggestion = tempAutoSuggestValue;
    } else {
        state.dropdownSelector = current;
        state.inputValue = autocompleteList[current].name;
        state.autoSuggestion = autocompleteList[current].name;
    }
}
