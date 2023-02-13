import axios from "axios";
import CodeEditor from "../components/common/CodeEditer";
import { useNotifiInfo } from "../hooks/useNotifiInfo";
import { useNotify } from "../hooks/useNotify";
import { step2code } from "../utils/constant";
import style from "../styles/adminAndUser.module.sass";
import { FC, useState } from "react";

const Home: FC = () => {
  const { setNotify } = useNotify();
  const { notifiInfo, setNotifiInfo } = useNotifiInfo();
  const [msgTitle, setMsgTitle] = useState<string>("");
  const [msgDescription, setMsgDescription] = useState<string>("");

  const broadcastNoti = async () => {
    try {
      await axios.get("/api/notifiBroadcast", {
        params: {
          notifiInfo,
          msgTitle,
          msgDescription,
        },
      });
      setNotify({
        status: "success",
        title: "Message broadcasted",
        description: "Successfully broadcasted notification, check the card",
      });
    } catch (e) {
      setNotify({ status: "error", title: "Broadcast error", description: JSON.stringify(e) });
    }
  };
  return (
    <>
      <div className={style.admin}>
        <div style={{ fontSize: "2rem" }}> Admin Case #1: Create broadcast api by @notifi-network/notifi-node</div>
        <div className={style.inputs}>
          <input
            type={"text"}
            onChange={(evt) => setNotifiInfo((old) => ({ ...old, sid: evt.target.value }))}
            value={notifiInfo.sid}
            placeholder="SID"
          />
          <input
            type={"text"}
            onChange={(evt) => setNotifiInfo((old) => ({ ...old, sidSecret: evt.target.value }))}
            value={notifiInfo.sidSecret}
            placeholder="SID secret"
          />
          <input
            type={"text"}
            onChange={(evt) => setNotifiInfo((old) => ({ ...old, broadcastId: evt.target.value }))}
            value={notifiInfo.broadcastId}
            placeholder="Broadcast ID"
          />
          <input
            type={"text"}
            onChange={(evt) => setMsgTitle(evt.target.value)}
            value={msgTitle}
            placeholder="Broadcast message title"
          />
          <input
            type={"text"}
            onChange={(evt) => setMsgDescription(evt.target.value)}
            value={msgDescription}
            placeholder="Broadcast message Description"
          />
        </div>
        <div>test SID: SRNRJE3FXQFQHR4KR6H0BMVPFXCI0D7Y</div>
        <div>{`test SID secret: >6#od$&m7jFmv&nd4?gSkummvGW$QDxF^n>>4cgbcG-oj6mK(gmE+INnyjV+Ic>g`}</div>
        <div>test topicName: colorfullife__announce</div>

        <CodeEditor value={step2code(notifiInfo, msgTitle, msgDescription)} />
        <div className={style.btns}>
          <button className="btn" onClick={broadcastNoti}>
            BROADCAST NOTIFICATION
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
