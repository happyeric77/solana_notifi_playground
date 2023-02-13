import { FC } from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import style from "../../styles/common.module.sass";
import { useNotify } from "../../hooks/useNotify";

const Notify: FC = () => {
  const { notify } = useNotify();
  return (
    <>
      {notify?.status && (
        <Alert status={notify.status} className={style.notifyContainer}>
          <div className={style.notifyTitleRow}>
            <AlertIcon boxSize="2rem" />
            <AlertTitle className={style.title}>{notify.title}</AlertTitle>
          </div>
          <AlertDescription className={style.notifyDescription}>{notify.description}</AlertDescription>
          {notify.link ? (
            <a href={notify.link} style={{ color: "#fbae21", textDecoration: "underline" }}>
              Check Explorer
            </a>
          ) : (
            ""
          )}
        </Alert>
      )}
    </>
  );
};

export default Notify;
