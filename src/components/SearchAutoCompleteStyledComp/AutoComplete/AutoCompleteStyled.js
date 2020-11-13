import React from "react";
import { connect } from "react-redux";
import {
    autocompleteListItemClick,
    autocompleteListMouseEnter,
    setSelector,
} from "../store/MainSearch/mainSearchReducer";
import { Li, UlDropdown } from "../StyledComp";

function AutoCompleteStyled({
    autocompleteList: data,
    dropdownSelector,
    setSelector,
    handleClickLi,
    handleMouseEnter,
}) {
    //resetujemo state zbog key pa posle setujemo input
    //NOTE: trebalo bi da  napisem jedan metod za oba
    function onClickHandler(e) {
        handleClickLi(e.target.innerText);
    }

    return (
        <UlDropdown
            position="absolute"
            onClick={onClickHandler}
            onMouseLeave={() => setSelector(-1)}
        >
            {data.map((item, index) => (
                <Li
                    selected={index === dropdownSelector}
                    key={item.code}
                    data-id={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                >
                    {item.name}
                </Li>
            ))}
        </UlDropdown>
    );
}

const mapStateToProps = (state) => ({
    dropdownSelector: state.dropdownSelector,
    autocompleteList: state.autocompleteList,
});

const mapDispatchToProps = (dispatch) => ({
    setSelector: (index) => dispatch(setSelector(index)),
    handleClickLi: (value) => dispatch(autocompleteListItemClick(value)),
    handleMouseEnter: (value) => dispatch(autocompleteListMouseEnter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteStyled);
