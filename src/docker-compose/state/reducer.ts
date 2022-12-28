import { IDockerComposeState } from ".";
import { Draft } from "immer";
import { NetworkConfig } from "../types";

export const initialState: IDockerComposeState = {
    project: {
        name: ""
    },
    networks: []
}

export function stateReducer(draft: Draft<IDockerComposeState>, action: any) {

    switch (action.type) {
        case "SET_PROJECT_NAME":
            draft.project.name = action.payload;
            break;
        case "ADD_NETWORK":
            let net = action.payload as NetworkConfig;
            let collision = draft.networks.findIndex((n) => n.label === net.label);
            if(collision > -1) {
                return;
            }
            else {
                let cpy = [...draft.networks];
                cpy.push(net);
                draft.networks = cpy;
            }
            break;
        default:
            break;
    }

}