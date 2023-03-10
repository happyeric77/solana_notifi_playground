import { Spinner } from "@chakra-ui/react";
import { FC } from "react";
import { useLoading } from "../../hooks/useLoading";
import style from "../../styles/common.module.sass";

const Loading: FC = () => {
  const { loadingData } = useLoading();
  const { size, msg, thickness, speed, emptyColor, color } = loadingData;
  return (
    <>
      {loadingData?.msg && (
        <div className={style.loadingContainer}>
          <Spinner
            size={size}
            thickness={thickness ? `${thickness}px` : "4px"}
            speed={speed ? `${speed}s` : "0.65s"}
            emptyColor={emptyColor ? emptyColor : "gray.200"}
            color={color ? color : "blue.500"}
          />
        </div>
      )}
    </>
  );
};
export default Loading;
