import { ConfigFile, NetworkConfig, SecretConfig, VolumeConfig } from "../types";

export interface IDockerComposeState {
    project: {
        name: string;
    },
    networks: NetworkConfig[];
    volumes: VolumeConfig[];
    configs: ConfigFile[];
    secrets: SecretConfig[];
}
