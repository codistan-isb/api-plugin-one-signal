const CUSTOMER_ONESIGNAL_APP_ID = process.env.CUSTOMER_ONESIGNAL_APP_ID;
const CUSTOMER_ONESIGNAL_REST_API_KEY =
  process.env.CUSTOMER_ONESIGNAL_REST_API_KEY;
const RIDER_ONESIGNAL_APP_ID = process.env.RIDER_ONESIGNAL_APP_ID;
const RIDER_ONESIGNAL_REST_API_KEY = process.env.RIDER_ONESIGNAL_REST_API_KEY;
const ADMIN_ONESIGNAL_APP_ID = process.env.ADMIN_ONESIGNAL_APP_ID;
const ADMIN_ONESIGNAL_REST_API_KEY = process.env.ADMIN_ONESIGNAL_REST_API_KEY;
import OneSignal from "onesignal-node";

export default async function oneSignalCreateNotification(
  context,
  { message, id, appType, userId, orderID }
) {
  console.log("oneSignalCreateNotification id ", id);
  console.log("oneSignalCreateNotification message", message);
  console.log("oneSignalCreateNotification appType", appType);
  console.log(" oneSignalCreateNotification userId", userId);
  console.log("oneSignalCreateNotification orderID", orderID);
  console.log("CUSTOMER_ONESIGNAL_APP_ID ", CUSTOMER_ONESIGNAL_APP_ID);
  console.log(
    "CUSTOMER_ONESIGNAL_REST_API_KEY ",
    CUSTOMER_ONESIGNAL_REST_API_KEY
  );
  if (appType === "rider") {
    const riderClient = new OneSignal.Client(
      RIDER_ONESIGNAL_APP_ID,
      RIDER_ONESIGNAL_REST_API_KEY
    );
    // console.log("RIDER_ONESIGNAL_APP_ID ", RIDER_ONESIGNAL_APP_ID);
    // console.log("RIDER_ONESIGNAL_REST_API_KEY ", RIDER_ONESIGNAL_REST_API_KEY)
    const notification = {
      contents: {
        en: message,
      },
      data: {
        id: id,
        type: appType,
        orderID: "",
      },
      include_external_user_ids: [userId],
      channel_for_external_user_ids: "push",
    };
    // console.log("notification obj for riderClient: ", notification);
    let response;
    try {
      response = await riderClient.createNotification(notification);
      // console.log("rider  response ", response);
    } catch (error) {
      console.log("Error ", error);
      throw new ReactionError("access-denied", `${error}`);
    }
    if (response?.statusCode == 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      };
    } else {
      return {
        statusCode: 500,
        msg: "Server Error",
      };
    }
  }
  if (appType === "customer") {
    const customerClient = new OneSignal.Client(
      CUSTOMER_ONESIGNAL_APP_ID,
      CUSTOMER_ONESIGNAL_REST_API_KEY
    );

    // console.log("customerClient ", customerClient)
    const notification = {
      contents: {
        en: message,
      },
      data: {
        id: id,
        type: appType,
        orderID: orderID,
      },
      // include_player_ids: ["4e997099-ff82-49ce-b45c-0ef5228e657b"],
      include_external_user_ids: [userId],
      channel_for_external_user_ids: "push",
    };
    // console.log("notification obj for customer Client: ", notification);
    let response;
    try {
      response = await customerClient.createNotification(notification);
      // console.log("customer Client response ", response);
    } catch (error) {
      console.log("Error ", error);
      throw new ReactionError("access-denied", `${error}`);
    }

    if (response?.statusCode == 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      };
    } else {
      return {
        statusCode: 500,
        msg: "Server Error",
      };
    }
  }
  if (appType === "admin") {
    const { Accounts } = context.collections;
    const allAdminUsers = await Accounts.find({ UserRole: "admin" }).toArray();
    // console.log("allAdminUsers ", allAdminUsers[0]._id);
    let idsArray = allAdminUsers.map((user) => user._id);
    // console.log("allAdminUsers ", idsArray);
    if (id) {
      idsArray.push(id);
    }
    // console.log("allAdminUsers ", idsArray);

    const adminClient = new OneSignal.Client(
      ADMIN_ONESIGNAL_APP_ID,
      ADMIN_ONESIGNAL_REST_API_KEY
    );
    // console.log("admin App id ", ADMIN_ONESIGNAL_APP_ID)
    // console.log("admin API key ", ADMIN_ONESIGNAL_REST_API_KEY)
    const notification = {
      contents: {
        en: message,
      },
      data: {
        id: id,
        type: appType,
        orderID: "",
      },

      include_external_user_ids: idsArray,
      channel_for_external_user_ids: "push",

      // include_player_ids: ["4e997099-ff82-49ce-b45c-0ef5228e657b"],
      // include_external_user_ids: idsArray,
    };
    // console.log("notification obj for admin Client: ", notification);
    let response;
    try {
      response = await adminClient.createNotification(notification);
      // console.log("response ", response);
    } catch (error) {
      console.log("Error", error);
      throw new ReactionError("access-denied", `${error}`);

    }
    // if (id) {
    //   const notification = {
    //     contents: {
    //       en: message,
    //     },
    //     data: {
    //       id: id,
    //       type: appType,
    //       orderID: "",
    //     },
    //     // include_player_ids: ["4e997099-ff82-49ce-b45c-0ef5228e657b"],
    //     include_external_user_ids: [id],
    //   };
    //   const response = await adminClient.createNotification(notification);
    //   console.log("Inner Admin response ", response);
    // }
    // console.log(" Admin response ", response);
    if (response?.statusCode == 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      };
    } else {
      return {
        statusCode: 500,
        msg: "Server Error",
      };
    }
  }
}
