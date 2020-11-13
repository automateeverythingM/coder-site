import { nanoid as id } from "nanoid";

function createTag(tagName) {
    const newTag = {
        id: id(),
        label: tagName,
        selected: true,
        backgroundColor: "#131518",
        // "#" +
        // ("000000" + (Math.random() * 7216).toString(16)).slice(-6),
        defaultTag: false,
    };
    return newTag;
}

function ValidateInput(input, array) {
    let result = true;

    if (!input) result = false;

    const lowerInput = input.toLowerCase();
    const alreadyExists = array.find(
        (item) => item.label.toLowerCase() === lowerInput
    );
    if (alreadyExists) result = false;

    return result;
}

export function manageTagList(tagName, listOfTags) {
    ValidateInput(tagName, listOfTags) && listOfTags.push(createTag(tagName));
}

export function onDeleteHandler(state, id) {
    const index = state.findIndex((tag) => tag.id === id);
    state.splice(index, 1);
}

export function onBackSpace(state) {
    state.pop();
}

export function toggleTagHandler(state, id) {
    const tag = state.find((tag) => tag.id === id);
    tag.selected = !tag.selected;
}
