import { ChakraProvider } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { ILoading, LoadingContext } from "./useLoading";
import { INotifiInfo, NotifiContext } from "./useNotifiInfo";
import { INotify, NotifyContext } from "./useNotify";
import { Wallet } from "./useWalletAdaptor";

export const AppContext: FC = ({ children }) => {
  const [notify, setNotify] = useState<INotify>({} as INotify);
  const [loadingData, setLoading] = useState<ILoading>({} as ILoading);
  const [notifiInfo, setNotifiInfo] = useState<INotifiInfo>({} as INotifiInfo);

  useEffect(() => {}, [notifiInfo.broadcastId, notifiInfo]);

  useEffect(() => {
    if (notify?.status) {
      setTimeout(() => {
        setNotify({} as INotify);
      }, 5000);
    }
  }, [notify]);

  return (
    <ChakraProvider>
      <Wallet>
        <NotifiContext.Provider value={{ notifiInfo, setNotifiInfo }}>
          <NotifyContext.Provider value={{ notify, setNotify }}>
            <LoadingContext.Provider value={{ loadingData, setLoading }}>{children}</LoadingContext.Provider>
          </NotifyContext.Provider>
        </NotifiContext.Provider>
      </Wallet>
    </ChakraProvider>
  );
};
