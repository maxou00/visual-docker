import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useImmerReducer } from "use-immer";
import { IDockerComposeState } from "../state";
import { initialState, stateReducer } from "../state/reducer";
import {
  ConfigFile,
  NetworkConfig,
  SecretConfig,
  ServiceConfig,
  VolumeConfig,
} from "../types";

interface DockerComposeContextType {
  state: IDockerComposeState;
  setProjectName: (name: string) => any;
  addNetwork: (conf: NetworkConfig) => any;
  addVolume: (conf: VolumeConfig) => any;
  addConfigFile: (conf: ConfigFile) => any;
  addSecret: (conf: SecretConfig) => any;
  addService: (conf: ServiceConfig) => any;
}

const Context = createContext<DockerComposeContextType>(undefined as any);

export const useDockerComposeProject = () => {
  const value = useContext(Context);
  if (!value) {
    throw Error(
      "useDockerComposeProject must be called within a DockerComposeProvider"
    );
  }
  return value;
};

export function DockerComposeProvider(props: PropsWithChildren<{}>) {
  const [state, dispatch] = useImmerReducer(stateReducer, initialState);
  const [init, setInit] = useState(false);

  const setProjectName = useCallback((name: string) => {
    dispatch({ type: "SET_PROJECT_NAME", payload: name });
  }, []);

  const addNetwork = useCallback((conf: NetworkConfig) => {
    dispatch({ type: "PUT_NETWORK", payload: conf });
  }, []);

  const addVolume = useCallback((conf: VolumeConfig) => {
    dispatch({ type: "PUT_VOLUME", payload: conf });
  }, []);

  const addConfigFile = useCallback((conf: ConfigFile) => {
    dispatch({ type: "PUT_CONFIG_FILE", payload: conf });
  }, []);

  const addSecret = useCallback((conf: SecretConfig) => {
    dispatch({ type: "PUT_SECRET", payload: conf });
  }, []);

  const addService = useCallback((conf: ServiceConfig) => {
    dispatch({ type: "PUT_SERVICE", payload: conf });
  }, []);

  useEffect(() => {
    let stored = localStorage.getItem("docker:compose/latest");
    if (stored) {
      let decoded = JSON.parse(stored);
      console.log("Decoded from storage ", decoded);
      if (decoded) {
        dispatch({ type: "FILL_STATE", payload: decoded });
      }
    }
    setInit(true);
  }, []);

  useEffect(() => {
    if (state && init) {
      console.log(state);
      localStorage.setItem("docker:compose/latest", JSON.stringify(state));
    }
  }, [state, init]);

  if (!init) {
    return <></>;
  }

  return (
    <Context.Provider
      value={{
        state: state,
        setProjectName,
        addNetwork,
        addVolume,
        addConfigFile,
        addSecret,
        addService,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
