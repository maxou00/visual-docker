import { NetworkConfig, VolumeConfig } from "../types";

export interface IDockerComposeState {
    project: {
        name: string;
    },
    networks: NetworkConfig[];
    volumes: VolumeConfig[];
}
