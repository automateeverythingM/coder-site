import React from "react";
import { Select, SelectLi, SelectWrapper, UlSelect } from "../StyledComp";
import { RiArrowDropDownLine } from "react-icons/ri";
import { connect } from "react-redux";
import {
    setSelectFilter,
    toggleFilterList,
} from "../../../../../store/reducers/searchReducer";
function Selection({
    data,
    selected,
    setSelected,
    toggleFilterList,
    showList,
}) {
    function clickHandler(e) {
        const id = e?.target?.dataset?.id;
        if (!id || selected.id === id) return;
        setSelected(e.target.dataset.id);
    }

    return (
        <SelectWrapper>
            <Select onClick={() => toggleFilterList()}>
                <div style={{ fontSize: "inherit" }}>{selected.name}</div>
                <RiArrowDropDownLine />
            </Select>
            <UlSelect
                show={showList}
                position="absolute"
                onClick={clickHandler}
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

const mapDispatchToProps = (dispatch) => {
    return {
        setSelected: (value) => dispatch(setSelectFilter(value)),
        toggleFilterList: () => dispatch(toggleFilterList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
