import produce from "immer";
import listOfProject from "../../components/mocks/ProjectCardMock";
import { nanoid as id } from "nanoid";
const ADD_PROJECT = "ADD_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";

export const addProject = (project) => {
    return { type: ADD_PROJECT, payload: { project } };
};

export const deleteProject = (id) => {
    return { type: DELETE_PROJECT, payload: { id } };
};

const initialState = {
    listOfProject: listOfProject,
};

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_PROJECT:
                const projWithId = {
                    ...action.payload.project,
                    id: id(),
                };
                draft.listOfProject.push(projWithId);
                break;

            case DELETE_PROJECT:
                const index = draft.listOfProject.findIndex(
                    (proj) => proj.id === action.payload.id
                );

                if (index !== -1) draft.listOfProject.splice(index, 1);

                break;

            default:
                break;
        }
    });
};

export default reducer;
