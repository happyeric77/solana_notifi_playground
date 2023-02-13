import type { NextApiRequest, NextApiResponse } from "next";
import { NotifiClient, NotifiEnvironment, createGraphQLClient, createNotifiService } from "@notifi-network/notifi-node";

export type INotifiResponse = {
  success: boolean;
  error: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<INotifiResponse>) {
  const env: NotifiEnvironment = "Development";
  const gqlClient = createGraphQLClient(env);
  const notifiService = createNotifiService(gqlClient);
  const client = new NotifiClient(notifiService);

  let status = 200;
  let success = true;
  let error = null;
  console.log(req.query["notifiInfo[sid]"]);
  const sid = req.query["notifiInfo[sid]"] as string;
  const sidSecret = req.query["notifiInfo[sidSecret]"] as string;
  const broadcastId = req.query["notifiInfo[broadcastId]"] as string;
  const msgTitle = req.query["msgTitle"] as string;
  const msgDescription = req.query["msgDescription"] as string;
  try {
    const { token, expiry } = await client.logIn({
      sid: sid,
      secret: sidSecret,
    });
    console.log(token);
    await client.sendBroadcastMessage(token, {
      idempotencyKey: Math.random().toString(), // Message ID
      topicName: broadcastId, // Broadcast Id
      variables: [
        { key: "message", value: msgTitle },
        { key: "subject", value: msgDescription },
      ],
    });
  } catch (e) {
    status = 404;
    error = JSON.stringify(e);
    success = false;
  }
  console.log({ status });
  res.status(status).json({ success, error });
}

// test SID: SRNRJE3FXQFQHR4KR6H0BMVPFXCI0D7Y
// test SID secret: >6#od$&m7jFmv&nd4?gSkummvGW$QDxF^n>>4cgbcG-oj6mK(gmE+INnyjV+Ic>g
// test topicName: colorfullife__announce
