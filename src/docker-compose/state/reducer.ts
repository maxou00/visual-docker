import { IDockerComposeState } from ".";
import { Draft } from "immer";

export const initialState: IDockerComposeState = {
    project: {
        name: ""
    }
}

export function stateReducer(draft: Draft<IDockerComposeState>, action: any) {
    
    switch(action.type) {
        case "SET_PROJECT_NAME":
            draft.project.name = action.payload;
            break;
        default:
            break;
    }

}