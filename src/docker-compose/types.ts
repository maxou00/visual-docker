export interface IPAMConfig {
  driver: 'default';
  config: {
    subnet: string;
    ip_range: string;
    gateway: string;
    aux_addresses: { [key: string]: string };
  };
  options: any;
}

export interface NetworkConfig {
  id?: string;
  label: string;
  driver?: 'bridge' | 'host' | 'overlay' | 'ipvlan' | 'macvlan' | 'none';
  driver_opts?: any;
  enable_ipv6?: boolean;
  external?: boolean;
  internal?: boolean;
  name?: string;
  labels?: any;
  ipam?: IPAMConfig;
}

export interface VolumeConfig {
  id?: string;
  label: string;
  name?: string;
  external?:
    | boolean
    | {
        name: string;
      };
  driver?: any;
  driver_opts?: any;
  labels?: any;
}

export interface ConfigFile {
  id?: string;
  label: string;
  name?: string;
  external?: boolean;
  file?: string;
}

export interface SecretConfig {
  id?: string;
  label: string;
  name?: string;
  external?: boolean;
  environment?: string;
  file?: string;
}

export interface WeightDevice {
  id?: string;
  path: string;
  weight: number;
}

export interface DeviceRate {
  id?: string;
  path: string;
  rate: number | string;
}

export interface DeviceIops {
  id?: string;
  path: string;
  rate: number;
}

export interface BlockIoConfig {
  weight: number;
  weight_device: WeightDevice[];

  device_read_bps: DeviceRate[];
  device_write_bps: DeviceRate[];

  device_read_iops: DeviceRate[];
  device_write_iops: DeviceRate[];
}

export interface CpuConfig {
  cpu_count?: number;
  cpu_percent?: number;
  cpu_shares?: number;
  cpu_period?: number;
  cpu_quota?: number;
  cpu_rt_runtime?: number | string;
  cpu_rt_period?: number | string;
  cpuset?: string;
}

export interface BindConfigToService {
  id?: string;
  source: string;
  target?: string;
  uid?: string;
  gid?: string;
  mode?: string;
}

export interface ServiceDependency {
  id?: string;
  label: string;
  condition?:
    | 'service_started'
    | 'service_healthy'
    | 'service_completed_successfully';
}

export interface BindVolumeToService {
  id?: string;
  type: 'volume' | 'bind' | 'npipe' | 'tmpfs';
  read_only?: boolean;
  bind?: {
    propagation?: any;
    create_host_path?: boolean;
    selinux?: 'z' | 'Z';
  };
  volume?: {
    nocopy?: boolean;
  };
  tmpfs?: {
    size?: number;
    mode?: string;
  };
  source: string;
  target?: string;
  consistency?: string;
}

/**
 * Okay this is a custom configuration.
 * In docker compose docs here https://docs.docker.com/compose/compose-file/#volumes_from
 * In compose file, this is supposed to be a string like service:mode for services inside this environment or container:container:mode for services living outside the env.
 */
export interface BindVolumeFrom {
  id?: string;
  managed?: boolean;
  service?: string;
  mode?: 'rw' | 'ro';
}

interface DeviceMapping {
  from: string;
  to: string;
  permissions: string;
}

export interface ServiceConfig extends CpuConfig {
  id: string;
  label: string;
  expose?: string;
  domainName?: string;
  entrypoint?: string;
  envFile?: string;
  dns?: string;
  image?: string;
  container_name?: string;
  blkio_config?: BlockIoConfig;
  command?: string;
  configs: BindConfigToService[];
  secrets: BindConfigToService[];
  volumes: BindVolumeToService[];
  volumes_from: BindVolumeFrom[];
  depends_on?: ServiceDependency[];
  devices?: DeviceMapping;
}
