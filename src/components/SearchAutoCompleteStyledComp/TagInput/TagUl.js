import React from "react";
import { Ul } from "../StyledComp";
import Tag from "./Tag";
import { connect } from "react-redux";
import { deleteTag } from "../store/MainSearch/mainSearchReducer";
function TagUl({ tagList, handleDeleteTag }) {
    function handleDeleteClick(e) {
        const id = e?.target?.dataset?.id;
        if (id) {
            handleDeleteTag(id);
        }
    }
    return (
        <div>
            <Ul onClick={handleDeleteClick}>
                {tagList.map((tag) => {
                    return (
                        <Tag
                            key={tag.id}
                            indx={tag.id}
                            label={tag.label}
                            backgroundColor={tag.backgroundColor}
                            selectedTag={tag.selected}
                        />
                    );
                })}
            </Ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tagList: state.tagList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteTag: (value) => dispatch(deleteTag(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagUl);
