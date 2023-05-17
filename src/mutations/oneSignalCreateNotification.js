const CUSTOMER_ONESIGNAL_APP_ID = process.env.CUSTOMER_ONESIGNAL_APP_ID;
const CUSTOMER_ONESIGNAL_REST_API_KEY = process.env.CUSTOMER_ONESIGNAL_REST_API_KEY;
const RIDER_ONESIGNAL_APP_ID = process.env.RIDER_ONESIGNAL_APP_ID;
const RIDER_ONESIGNAL_REST_API_KEY = process.env.RIDER_ONESIGNAL_REST_API_KEY;
const ADMIN_ONESIGNAL_APP_ID = process.env.ADMIN_ONESIGNAL_APP_ID;
const ADMIN_ONESIGNAL_REST_API_KEY = process.env.ADMIN_ONESIGNAL_REST_API_KEY;
import OneSignal from "onesignal-node";


export default async function oneSignalCreateNotification(context, { message, id, appType, userId, orderID }) {

  if (appType === 'rider') {
    const riderClient = new OneSignal.Client(RIDER_ONESIGNAL_APP_ID, RIDER_ONESIGNAL_REST_API_KEY);
    console.log("RIDER_ONESIGNAL_APP_ID ", RIDER_ONESIGNAL_APP_ID);
    console.log("RIDER_ONESIGNAL_REST_API_KEY ", RIDER_ONESIGNAL_REST_API_KEY)
    const notification = {
      contents: {
        en: message,
      },
      data: {
        id: id,
        type: appType,
      },
      include_external_user_ids: [userId]
    };
    console.log("notification obj for riderClient: ", notification);

    const response = await riderClient.createNotification(notification);
    console.log("rider Client response ", response)
    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      }
    }

  }
  if (appType === 'customer') {
    const customerClient = new OneSignal.Client(CUSTOMER_ONESIGNAL_APP_ID, CUSTOMER_ONESIGNAL_REST_API_KEY);

    console.log("customerClient ", customerClient)
    const notification = {
      contents: {
        en: message,
      },
      data: {
        id: id,
        type: appType,
        orderID: orderID
      },
      include_external_user_ids: [userId]
    };
    console.log("notification obj for customer Client: ", notification);

    const response = await customerClient.createNotification(notification);
    console.log("customer Client response ", response)
    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      }
    }


  }
  if (appType === 'admin') {
    const adminClient = new OneSignal.Client(ADMIN_ONESIGNAL_APP_ID, ADMIN_ONESIGNAL_REST_API_KEY);
    console.log("admin App id ", ADMIN_ONESIGNAL_APP_ID)
    console.log("admin API key ", ADMIN_ONESIGNAL_REST_API_KEY)
    const notification = {
      contents: {
        en: message,
      },
      data: {
        id: id,
        type: appType
      },
      include_external_user_ids: [userId]
    };
    console.log("notification obj for admin Client: ", notification);

    const response = await adminClient.createNotification(notification);
    console.log(" Admin response ", response)
    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      }
    }


  }
}
