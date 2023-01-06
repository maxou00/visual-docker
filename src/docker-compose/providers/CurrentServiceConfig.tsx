import { createContext, PropsWithChildren, useContext } from "react";
import { ServiceConfig } from "../types";

interface ServiceContextType {
  service: ServiceConfig;
}

const Context = createContext<ServiceContextType>(undefined as any);

export const useCurrentService = () => {
  const value = useContext(Context);
  if (!value) {
    throw Error("useCurrentService must be called within a ProvideService");
  }
  return value;
};

export function ProvideService(
  props: PropsWithChildren<{ service: ServiceConfig }>
) {
  return (
    <Context.Provider
      value={{
        service: props.service,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
