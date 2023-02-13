# Notifi.network playground

When doing the integration with notifi.network [notification service](https://notifi.network/). Testing the "card" (can be registered from [notifi admin panel](https://admin.dev.notifi.network/)) in development environment is important to ensure the DAPP is working as expected.

This playground makes use of the following three key SDKs' example code. You will be able to fill in your own card info (or credential) to try out the result.

- [@notifi-network/@notifi-network/notifi-node](https://www.npmjs.com/package/@notifi-network/notifi-node)
- [@notifi-network/notifi-react-card](https://www.npmjs.com/package/@notifi-network/notifi-react-card)
- [@notifi-network/notifi-react-hook](https://www.npmjs.com/package/@notifi-network/notifi-react-hooks)

> **[TRY IT OUT](https://solana-notifi-playground.vercel.app/user)**
> Playground Source code: [Githug repo](git@github.com:happyeric77/solana_notifi_playground.git)

# How to use

## 1. Register a admin account and create a new card

Head over to https://admin.dev.notifi.network and create a new developer/tenant account if you haven't already.
![](https://i.imgur.com/VU4GtQZ.png)

With a developer login, you can generate a new card with cardId and needed credentials

## 2. [Playground "USER Config"](https://solana-notifi-playground.vercel.app/user) page

User case #1 example code in USER config is to create a notifi card as below.
![](https://i.imgur.com/fGvvEJc.png)

After inputing the valid **dappAddress** & **cardId**, the subscribed user data will be shown in the card dropdown dialog. Remember to login with Solana wallet before doing so.

> Note: When inputing the **dappAddress** & **cardId** into place holder, the corresponding place is example code changes simutanously.

![](https://i.imgur.com/V16P9K8.png)

User case #2 example code is to demonstrating the capibility to create more cusomized behaviors integrated with user info. In this case, example code can create 3 extra user features **Login**, **FetchData**, and **LOGOUT**
![](https://i.imgur.com/Zp4ZnIL.png)

## 3. [Playground "ADMIN"](https://solana-notifi-playground.vercel.app/) page

Admin case #1 example code is to allow admin to create broadcast to subscribed users.

> Note: When inputing the **SID** & **SID secret** & **Broadcast ID** & **msg title** & **msg description** into place holder, the corresponding place is example code changes simutanously.
> ![](https://i.imgur.com/qi2T6OM.png)
