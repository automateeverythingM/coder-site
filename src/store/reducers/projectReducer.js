import produce from "immer";
import listOfProject from "../../components/mocks/ProjectCardMock";
import { nanoid as id } from "nanoid";
const ADD_PROJECT = "ADD_PROJECT";

export const addProject = (project) => {
    return { type: ADD_PROJECT, payload: { project } };
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
                console.log(
                    "🚀 ~ file: projectReducer.js ~ line 19 ~ returnproduce ~ projWithId",
                    projWithId
                );
                draft.listOfProject.push(projWithId);
                break;

            default:
                break;
        }
    });
};

export default reducer;
