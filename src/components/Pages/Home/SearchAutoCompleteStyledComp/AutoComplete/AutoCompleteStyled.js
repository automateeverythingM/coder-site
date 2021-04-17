import React from "react";
import { connect } from "react-redux";
import {
    autocompleteListItemClick,
    autocompleteListMouseEnter,
    setSelector,
} from "../../../../../store/reducers/searchReducer";
import { Li, UlDropdown } from "../StyledComp";

function AutoCompleteStyled({
    autocompleteList: data,
    dropdownSelector,
    dispatch,
}) {
    console.log("🚀 ~ file: AutoCompleteStyled.js ~ line 15 ~ data", data);
    return (
        <UlDropdown
            position="absolute"
            onClick={(e) => dispatch(autocompleteListItemClick(e))}
            onMouseLeave={() => dispatch(setSelector(-1))}
        >
            {data.map((item, index) => (
                <Li
                    selected={index === dropdownSelector}
                    key={item.code}
                    data-id={index}
                    onMouseEnter={() =>
                        dispatch(autocompleteListMouseEnter(index))
                    }
                >
                    {item.name}
                </Li>
            ))}
        </UlDropdown>
    );
}

const mapStateToProps = ({ searchReducer }) => ({
    dropdownSelector: searchReducer.dropdownSelector,
    autocompleteList: searchReducer.autocompleteList,
});

// export default React.memo(AutoCompleteStyled);
export default connect(mapStateToProps)(AutoCompleteStyled);
