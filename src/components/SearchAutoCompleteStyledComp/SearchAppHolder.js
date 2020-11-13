import React from "react";
import SearchAutoTags from "./SearchAutoTags";
import Provider from "./store/configStore";
export default function SearchAppHolder() {
    return (
        <Provider>
            <SearchAutoTags />
        </Provider>
    );
}
