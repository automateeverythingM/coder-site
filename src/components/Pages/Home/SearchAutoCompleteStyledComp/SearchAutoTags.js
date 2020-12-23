import React from "react";
import SearchACSC from "./SearchACSC";
import TagUl from "./TagInput/TagUl";

export default function SearchAutoTags() {
    return (
        <div className="text-dark w-75 mx-auto">
            <TagUl />
            <SearchACSC />
        </div>
    );
}
