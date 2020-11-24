export const appendSuggestion = (currentValue, suggestion) => {
    const toAppend = suggestion.slice(currentValue.length);
    currentValue += toAppend;
    return currentValue;
};
