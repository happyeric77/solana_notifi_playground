import { createContext, Dispatch, SetStateAction, useContext } from "react";
type ILoadingContext = {
  setLoading: Dispatch<SetStateAction<ILoading>>;
  loadingData: ILoading;
};
export type ILoading = {
  msg: string;
  size?: "xl" | "xs" | "sm" | "md" | "lg";
  thickness?: number; // uint ex: 3 (in pixel)
  speed?: number; // floating point ex: 0.65s (in second)
  emptyColor?: string; // ex: gray.200 (see chakra doc)
  color?: string; // ex: blue.500 (see chakra doc)
};
export const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export function useLoading(): ILoadingContext {
  return useContext(LoadingContext);
}
