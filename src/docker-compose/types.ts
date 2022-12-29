export interface IPAMConfig {
    driver: "default";
    config: {
        subnet: string;
        ip_range: string;
        gateway: string;
        aux_addresses: { [key: string]: string }
    }
    options: any;
}

export interface NetworkConfig {
    label: string;
    driver?: "bridge" | "host" | "overlay" | "ipvlan" | "macvlan" | "none";
    driver_opts?: any;
    enable_ipv6?: boolean;
    external?: boolean;
    internal?: boolean;
    name?: string;
    labels?: any;
    ipam?: IPAMConfig;
}

export interface VolumeConfig {
    label: string;
    name?: string;
    external?: boolean | {
        name: string;
    };
    driver?: any;
    driver_opts?: any;
    labels?: any;
}

export interface ConfigFile {
    label: string;
    name?: string;
    external?: boolean;
    file?: string;
}

export interface SecretConfig {
    label: string;
    name?: string;
    external?: boolean;
    environment?: string;
    file?: string;
}