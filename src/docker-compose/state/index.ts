import {
 ConfigFile,
 NetworkConfig,
 SecretConfig,
 ServiceConfig,
 VolumeConfig
} from '../types'

interface AvailableDisk {
 size: number
 unit: 'GiB' | 'TiB'
}

interface AvailableCPU {
 count: number
 speed: number
 speed_unit: 'ghz'
}

export interface IDockerComposeState {
 project: {
  name: string
  version: string
  disk?: AvailableDisk
  cpu?: AvailableCPU
 }
 networks: NetworkConfig[]
 volumes: VolumeConfig[]
 configs: ConfigFile[]
 secrets: SecretConfig[]
 services: ServiceConfig[]
}
