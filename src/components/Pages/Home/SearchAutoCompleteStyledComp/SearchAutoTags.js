import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSubmitMainSearch } from "../../../../store/reducers/searchReducer";
import SearchACSC from "./SearchACSC";
import TagUl from "./TagInput/TagUl";

export default function SearchAutoTags() {
    const dispatch = useDispatch();
    const data = useSelector(({ searchReducer }) => ({
        searchTerm: searchReducer.inputValue,
        searchBy: searchReducer.selectedFilter,
        filters: searchReducer.tagList,
    }));
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log(
                    "🚀 ~ file: SearchAutoTags.js ~ line 28 ~ SearchAutoTags ~ data",
                    data
                );
            }}
            className="text-dark w-75 mx-auto"
        >
            <TagUl />
            <SearchACSC />
        </form>
    );
}
