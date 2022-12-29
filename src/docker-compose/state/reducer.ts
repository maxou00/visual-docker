import { IDockerComposeState } from ".";
import { Draft } from "immer";
import { ConfigFile, NetworkConfig, SecretConfig, VolumeConfig } from "../types";

export const initialState: IDockerComposeState = {
    project: {
        name: ""
    },
    networks: [],
    volumes: [],
    configs: [],
    secrets: []
}

export function stateReducer(draft: Draft<IDockerComposeState>, action: any) {

    if (action.type === "SET_PROJECT_NAME") {
        draft.project.name = action.payload;
    }
    else if (action.type === "PUT_NETWORK") {
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
    else if (action.type === "PUT_VOLUME") {
        let net = action.payload as VolumeConfig;
        let collisionIndex = draft.volumes.findIndex((n) => n.label === net.label);
        if (collisionIndex > -1) {
            let cpy = [...draft.volumes];
            cpy[collisionIndex] = net;
            draft.volumes = cpy;
        }
        else {
            let cpy = [...draft.volumes];
            cpy.push(net);
            draft.volumes = cpy;
        }
    }
    else if (action.type === "PUT_CONFIG_FILE") {
        let net = action.payload as ConfigFile;
        let collisionIndex = draft.configs.findIndex((n) => n.label === net.label);
        if (collisionIndex > -1) {
            let cpy = [...draft.configs];
            cpy[collisionIndex] = net;
            draft.configs = cpy;
        }
        else {
            let cpy = [...draft.configs];
            cpy.push(net);
            draft.configs = cpy;
        }
    }
    else if (action.type === "PUT_SECRET") {
        let net = action.payload as SecretConfig;
        let collisionIndex = draft.secrets.findIndex((n) => n.label === net.label);
        if (collisionIndex > -1) {
            let cpy = [...draft.secrets];
            cpy[collisionIndex] = net;
            draft.secrets = cpy;
        }
        else {
            let cpy = [...draft.secrets];
            cpy.push(net);
            draft.secrets = cpy;
        }
    }

}