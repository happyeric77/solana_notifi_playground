import { createContext, Dispatch, SetStateAction, useContext } from "react";
export interface INotifiInfo {
  appAddress: string;
  cardId: string;
  sid: string;
  sidSecret: string;
  broadcastId: string;
}
export interface INotifiContext {
  setNotifiInfo: Dispatch<SetStateAction<INotifiInfo>>;
  notifiInfo: INotifiInfo;
}

export const NotifiContext = createContext<INotifiContext>({} as INotifiContext);

export function useNotifiInfo(): INotifiContext {
  return useContext(NotifiContext);
}
