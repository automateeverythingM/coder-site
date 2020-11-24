import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import {
    addTag,
    clearAllInputs,
    popTag,
    resetState,
    setAllInputs,
    setAutoSuggestion,
    setInputValue,
    moveSelector,
    focusInput,
    assignInputRef,
    setAutoSuggestionAndCaseSensitive,
    setAutocompleteList,
} from "../../../../../store/reducers/searchReducer";
import {
    CloseButton,
    Input,
    InputWrapper,
    SearchButton,
    SearchInputs,
    Wrapper,
} from "../StyledComp";
import Selection from "../Selection/Selection";
function InputStyled({
    handleOnChange,
    suggestedWord,
    showDropdown,
    inputValue,
    assignInputRef,
    autoSuggestion,
    setAutoAndCaseSens,
    clearAutocompleteList,
    addTag,
    popTag,
    resetState,
    setAllInputs,
    setAutoSuggestion,
    setInputValue,
    moveSelector,
    caseSensitiveFill,
    dropdownSelector,
}) {
    const [backspaceDelay, setBackspaceDelay] = useState(true);

    let inputRef;

    //appedndujemo na base word suggestion
    const appendSuggestion = (currentValue, suggestion) => {
        const toAppend = suggestion.slice(currentValue.length);
        currentValue += toAppend;
        return currentValue;
    };

    const autoSuggestionManager = (value) => {
        const name = suggestedWord(value);

        if (name === autoSuggestion) return;
        else if (!name) setAutoSuggestion("");
        else {
            let appendedName = appendSuggestion(value, name);
            setAutoAndCaseSens(appendedName, name);
        }
    };

    useEffect(() => {
        if (inputValue === "") inputRef.focus();
    });

    useEffect(() => {
        inputRef.focus();
        assignInputRef(inputRef);
    }, [assignInputRef, inputRef]);

    // set value and call call users handler
    const handleOnChangeInput = (event) => {
        const value = event.target.value;

        //! **********************************
        setInputValue(value);
        autoSuggestionManager(value);

        if (value.trim()) handleOnChange(value);
        setBackspaceDelay(false);
    };

    //clean input value
    const handleClearInput = (event) => {
        event.preventDefault();
        resetState();
    };

    //tab autoSuggest pass value to input field
    const handleKeyDown = (event) => {
        const currentInputValue = event.target.value;
        if (event.key === "Tab") {
            event.preventDefault();
            if (dropdownSelector > -1) return;

            // if (dropdownSelector !== -1) return;
            //ako ima vredonst setujemo je
            autoSuggestion && setAllInputs(caseSensitiveFill);
        }
        //
        else if (event.key === "Backspace" && !currentInputValue) {
            // NOTE: previse brzo brise tagove ako se zadrzi key, mozda neki timeout

            if (backspaceDelay) {
                popTag();
            }
        }
        //add tag and reset all
        else if (event.key === "Enter") {
            //! **********************************
            addTag(currentInputValue);
        }

        //pomera selektor
        else if (event.key === "ArrowDown") {
            event.preventDefault();
            moveSelector(event.key);
        }

        //
        else if (event.key === "ArrowUp") {
            event.preventDefault();
            moveSelector(event.key);
        }
        //
        else if (event.key === "Escape") {
            clearAutocompleteList();
        }
    };

    function handleKeyUp(event) {
        const currentInputValue = event.target.value;

        if (event.key === "Backspace" && !currentInputValue) {
            // NOTE: previse brzo brise tagove ako se zadrzi key, mozda neki timeout
            setBackspaceDelay(true);
        }
    }

    //

    return (
        <Wrapper>
            <SearchInputs showDropdown={showDropdown}>
                <InputWrapper>
                    <Input
                        type="text"
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleOnChangeInput}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        zIndex="50"
                        ref={(input) => (inputRef = input)}
                    />
                    <Input
                        type="text"
                        readOnly
                        autoComplete="off"
                        value={autoSuggestion}
                        zIndex="20"
                        color="#d4d4d4"
                        autoFocus
                    />
                </InputWrapper>
                <CloseButton
                    color="red"
                    show={inputValue.length}
                    onClick={handleClearInput}
                >
                    &times;
                </CloseButton>
            </SearchInputs>
            <Selection />
            <SearchButton showDropdown={showDropdown}>
                <GoSearch size="1.5em" />
            </SearchButton>
        </Wrapper>
    );
}

const mapStateToProps = ({ searchReducer }) => {
    return {
        inputValue: searchReducer.inputValue,
        autoSuggestion: searchReducer.autoSuggestion,
        caseSensitiveFill: searchReducer.caseSensitiveFillSuggestion,
        dropdownSelector: searchReducer.dropdownSelector,
        refInput: searchReducer.inputRef,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAutoSuggestion: (value) => {
            dispatch(setAutoSuggestion(value));
        },
        setAutoAndCaseSens: (appendedValue, value) =>
            dispatch(setAutoSuggestionAndCaseSensitive(appendedValue, value)),
        setInputValue: (value) => dispatch(setInputValue(value)),
        clearAutocompleteList: () => dispatch(setAutocompleteList([])),
        clearAllInputs: () => dispatch(clearAllInputs()),
        setAllInputs: (value) => dispatch(setAllInputs(value)),
        popTag: () => dispatch(popTag()),
        addTag: (value) => dispatch(addTag(value)),
        resetState: () => dispatch(resetState()),
        moveSelector: (value) => dispatch(moveSelector(value)),
        setInputFocus: () => dispatch(focusInput()),
        assignInputRef: (value) => dispatch(assignInputRef(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputStyled);
