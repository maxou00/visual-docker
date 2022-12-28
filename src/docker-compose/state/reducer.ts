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

    if(action.type === "SET_PROJECT_NAME") {
        draft.project.name = action.payload;
    }
    else if(action.type === "PUT_NETWORK") {
        let net = action.payload as NetworkConfig;
        let collisionIndex = draft.networks.findIndex((n) => n.label === net.label);
        if (collisionIndex > -1) {
            let cpy = [...draft.networks];
            cpy[collisionIndex] = net;
            draft.networks = cpy;
        }
        else {
            let cpy = [...draft.networks];
            cpy.push(net);
            draft.networks = cpy;
        }
    }

}