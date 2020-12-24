import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import { debounce } from "loadsh";
import {
    addTag,
    popTag,
    setAllInputs,
    setInputValue,
    moveSelector,
    assignInputRef,
    setAutocompleteList,
    resetStateAndFocusInput,
} from "../../../../../store/reducers/searchReducer";
//
import {
    CloseButton,
    Input,
    InputWrapper,
    SearchButton,
    SearchInputs,
    Wrapper,
} from "../StyledComp";
//
import Selection from "../Selection/Selection";
import { autoSuggestionManager } from "./helper";
//

function InputStyled({
    handleOnChange,
    suggestedWord,
    showDropdown,
    inputValue,
    autoSuggestion,
    caseSensitiveFill,
    dropdownSelector,
    dispatch,
}) {
    const [backspaceDelay, setBackspaceDelay] = useState(true);

    let inputRef;

    useEffect(() => {
        inputRef.focus();
        dispatch(assignInputRef(inputRef));
    }, [dispatch, inputRef]);

    const backspaceDelayDebounce = useMemo(
        () =>
            debounce(() => {
                console.log("Set to true");
                setBackspaceDelay(true);
            }, 500),
        []
    );

    // set value and call call users handler
    const handleOnChangeInput = (event) => {
        const value = event.target.value;
        //! **********************************
        dispatch(setInputValue(value));

        autoSuggestionManager(value, suggestedWord, autoSuggestion, dispatch);

        if (value.trim()) handleOnChange(value);

        backspaceDelayDebounce();
        if (backspaceDelay) {
            setBackspaceDelay(false);
        }
    };

    //clean input value
    const handleClearInput = (event) => {
        event.preventDefault();
        dispatch(resetStateAndFocusInput());
    };

    const handleKeyDown = (event) => {
        const currentInputValue = event.target.value;
        const key = event.key;

        //ako input nije prazan i postoji autosugestion custom Tab
        if (key === "Tab" && currentInputValue) {
            event.preventDefault();
            if (dropdownSelector > -1) return;

            autoSuggestion && dispatch(setAllInputs(caseSensitiveFill));
        }
        //
        else if (key === "Backspace" && !currentInputValue) {
            // NOTE: previse brzo brise tagove ako se zadrzi key, mozda neki timeout

            if (backspaceDelay) {
                dispatch(popTag());
            }
        }
        //add tag and reset all
        else if (key === "Enter") {
            //! **********************************
            dispatch(addTag(currentInputValue));
        }

        //pomera selektor
        else if (key === "ArrowDown") {
            event.preventDefault();
            dispatch(moveSelector(event.key));
        }

        //
        else if (key === "ArrowUp") {
            event.preventDefault();
            dispatch(moveSelector(event.key));
        }
        //
        else if (key === "Escape") {
            dispatch(setAutocompleteList([]));
        }
    };

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

export default connect(mapStateToProps)(InputStyled);
