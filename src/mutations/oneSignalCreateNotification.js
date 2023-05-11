const CUSTOMER_ONESIGNAL_APP_ID = process.env.CUSTOMER_ONESIGNAL_APP_ID;
const CUSTOMER_ONESIGNAL_REST_API_KEY = process.env.CUSTOMER_ONESIGNAL_REST_API_KEY;
const RIDER_ONESIGNAL_APP_ID = process.env.RIDER_ONESIGNAL_APP_ID;
const RIDER_ONESIGNAL_REST_API_KEY = process.env.RIDER_ONESIGNAL_REST_API_KEY;
import OneSignal from "onesignal-node";

export default async function oneSignalCreateNotification(context, { message, id, appType, userId }) {

  if (appType === 'customer') {
    const riderClient = new OneSignal.Client(CUSTOMER_ONESIGNAL_APP_ID, CUSTOMER_ONESIGNAL_REST_API_KEY);
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
    // console.log("notification obj for riderClient: ", notification);

    const response = await riderClient.createNotification(notification);
    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      }
    }

  }
  else {
    const customerClient = new OneSignal.Client(RIDER_ONESIGNAL_APP_ID, RIDER_ONESIGNAL_REST_API_KEY);
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
    // console.log("notification obj for riderClient: ", notification);

    const response = await customerClient.createNotification(notification);
    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        msg: "Notification created",
      }
    }
  }
}
