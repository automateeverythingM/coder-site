import React, { useEffect } from "react";
import AutoCompleteStyled from "./AutoComplete/AutoCompleteStyled";
import InputStyled from "./Input/InputStyled";
import mockStates from "./mocks/inputAutoComplete";
import { RelativeContainer } from "./StyledComp";
import { connect } from "react-redux";
import {
    fetchAutoCompleteList,
    setAutocompleteList,
} from "./store/MainSearch/mainSearchReducer";

function SearchACSC({
    autocompleteList,
    inputLength,
    getAutoCompleteList,
    emptyAutoCompleteList,
}) {
    //Proveravamo da li je lista prazna
    const showDropdown = !!autocompleteList.length && !!inputLength;

    //Trazimo odgovarajucu rec za dopunu
    //NOTE: treba napraviti dobru logiku i snimati najcesce koriscene reci
    const suggestionWords = (input) => {
        if (!input?.trim()) return;
        const word = mockStates.find((x) =>
            x.name.toLowerCase().startsWith(input.toLowerCase())
        );
        return word ? word.name : null;
    };

    //trazimo listu iz api rute
    const onChange = (inputValue) => {
        getAutoCompleteList(inputValue);
    };
    //prazni listu ako je ostalo nesto posle zatvaranja liste
    useEffect(() => {
        if (!showDropdown) emptyAutoCompleteList([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDropdown]);

    return (
        <RelativeContainer>
            <InputStyled
                suggestedWord={suggestionWords}
                handleOnChange={onChange}
                showDropdown={showDropdown}
            />
            {showDropdown && <AutoCompleteStyled />}
        </RelativeContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        autocompleteList: state.autocompleteList,
        inputLength: state.inputValue.length,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAutoCompleteList: (value) => dispatch(fetchAutoCompleteList(value)),
        emptyAutoCompleteList: (value) => dispatch(setAutocompleteList(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchACSC);
