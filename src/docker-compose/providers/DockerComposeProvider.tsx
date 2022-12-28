import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { useImmerReducer } from "use-immer";
import { IDockerComposeState } from "../state";
import { initialState, stateReducer } from "../state/reducer";
import { NetworkConfig, VolumeConfig } from "../types";

interface DockerComposeContextType {
  state: IDockerComposeState;
  setProjectName: (name: string) => any;
  addNetwork: (conf: NetworkConfig) => any;
  addVolume: (conf: VolumeConfig) => any;
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

  const setProjectName = useCallback((name: string) => {
    dispatch({ type: "SET_PROJECT_NAME", payload: name });
  }, []);

  const addNetwork = useCallback((conf: NetworkConfig) => {
    dispatch({ type: "PUT_NETWORK", payload: conf });
  }, []);

  const addVolume = useCallback((conf: VolumeConfig) => {
    dispatch({ type: "PUT_VOLUME", payload: conf });
  }, []);

  return (
    <Context.Provider
      value={{
        state: state,
        setProjectName,
        addNetwork,
        addVolume
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
