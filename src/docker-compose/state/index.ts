import { NetworkConfig } from "../types";

export interface IDockerComposeState {
    project: {
        name: string;
    },
    networks: NetworkConfig[];
}
