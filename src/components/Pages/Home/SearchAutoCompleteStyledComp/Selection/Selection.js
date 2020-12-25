import React from "react";
import { Select, SelectLi, SelectWrapper, UlSelect } from "../StyledComp";
import { RiArrowDropDownLine } from "react-icons/ri";
import { connect } from "react-redux";
import {
    onBlurHideFilterList,
    setSelectFilter,
    toggleFilterList,
} from "../../../../../store/reducers/searchReducer";
function Selection({ data, selected, dispatch, showList }) {
    function clickHandler(e) {
        const id = e?.target?.dataset?.id;
        if (!id || selected.id === id) return;
        dispatch(setSelectFilter(e.target.dataset.id));
    }

    return (
        <SelectWrapper>
            <Select
                onClick={() => dispatch(toggleFilterList())}
                onBlur={() => {
                    dispatch(onBlurHideFilterList());
                }}
                tabIndex="0"
            >
                <div style={{ fontSize: "inherit" }}>{selected.name}</div>
                <RiArrowDropDownLine />
            </Select>
            <UlSelect
                show={showList}
                position="absolute"
                onMouseDown={clickHandler}
            >
                {data.map((item) => {
                    return (
                        <SelectLi
                            selected={item.selected}
                            key={item.id}
                            data-id={item.id}
                        >
                            {item.name}
                        </SelectLi>
                    );
                })}
            </UlSelect>
        </SelectWrapper>
    );
}

const mapStateToProps = ({ searchReducer }) => {
    return {
        data: searchReducer.selectFilterList,
        selected: searchReducer.selectedFilter,
        showList: searchReducer.showFilterList,
    };
};

export default connect(mapStateToProps)(Selection);
