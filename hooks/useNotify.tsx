import { AlertStatus } from "@chakra-ui/react";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
export interface INotify {
  status: AlertStatus;
  title: string;
  description: string;
  link?: string;
}
export interface INotifyContext {
  setNotify: Dispatch<SetStateAction<INotify>>;
  notify: INotify;
}

export const NotifyContext = createContext<INotifyContext>({} as INotifyContext);

export function useNotify(): INotifyContext {
  return useContext(NotifyContext);
}
