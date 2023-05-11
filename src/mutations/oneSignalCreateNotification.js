const CUSTOMER_ONESIGNAL_APP_ID = process.env.CUSTOMER_ONESIGNAL_APP_ID;
const CUSTOMER_ONESIGNAL_REST_API_KEY = process.env.CUSTOMER_ONESIGNAL_REST_API_KEY;
const RIDER_ONESIGNAL_APP_ID = process.env.RIDER_ONESIGNAL_APP_ID;
const RIDER_ONESIGNAL_REST_API_KEY = process.env.RIDER_ONESIGNAL_REST_API_KEY;
import OneSignal from "onesignal-node";
// import { sendNotficationToSocket } from "../util/sendSocketNotification";
/**
 * @method oneSignalCreateNotification
 * @summary Creates a Stripe Payment Intent and return the client secret
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Necessary input. See SimpleSchema
 * @return {Promise<String>} String with the client secret of the Payment Intent
 */

export default async function oneSignalCreateNotification(context, { message, id, appType, userId }) {
  // console.log("In one Signal Mutation ", data);
  // console.log("Message ", message)
  // console.log("id ", id)
  // console.log("type ", type)
  // console.log("userId ", userId);
  // console.log("CUSTOMER_ONESIGNAL_APP_ID, ", CUSTOMER_ONESIGNAL_APP_ID, "CUSTOMER_ONESIGNAL_REST_API_KEY ", CUSTOMER_ONESIGNAL_REST_API_KEY);
  // console.log("RIDER_ONESIGNAL_APP_ID, ", RIDER_ONESIGNAL_APP_ID, "RIDER_ONESIGNAL_REST_API_KEY ", RIDER_ONESIGNAL_REST_API_KEY);

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


  // const notification = {
  //   contents: {
  //     en: "Hello, world!",
  //   },
  //   include_external_user_ids: ["12345"],
  // };

  // const response = await client2.createNotification(notification);
  // const newnotfication = await new Notification({
  //   message: message,
  //   type: type,
  //   id: id,
  //   userId: userId,
  //   status: type ? "Pending" : null
  // }).save();
  // console.log("newnotfication ", newnotfication)
  // var sendNotificationEvent = await sendNotficationToSocket(id, newnotfication._id, userId);

  // console.log("Response is ", response);

  // return {
  //   msg: "Notification created",
  // };

  // const { accountId, collections } = context;
  // const { Cart } = collections;

  // if (!cartId) {
  //   throw new ReactionError("invalid-param", "You need to provide a cart ID");
  // }

  // const selector = { _id: cartId };
  // if (cartToken) {
  //   selector.anonymousAccessToken = hashToken(cartToken);
  // } else if (accountId) {
  //   selector.accountId = accountId;
  // } else {
  //   throw new ReactionError(
  //     "invalid-param",
  //     "A token is required when updating an anonymous cart"
  //   );
  // }

  // const cart = await Cart.findOne(selector);

  // const checkoutInfo = await xformCartCheckout(collections, cart);

  // const totalAmount = Math.round(checkoutInfo.summary.total.amount * 100);

  // const shop = await context.queries.shopById(context, shopId);

  // const stripe = await getStripeInstance(context);

  // try {
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: totalAmount,
  //     currency: cart.currencyCode,
  //     description: `${shop.name} Ref: ${cart.referenceId}`,
  //     /* eslint-disable camelcase */
  //     payment_method_types: ["card"],
  //     /* eslint-disable camelcase */
  //     capture_method: "manual",
  //     metadata: {
  //       integration_check: "accept_a_payment",
  //     } /* eslint-disable camelcase */,
  //   });

  //   return paymentIntent.client_secret;
  // } catch (error) {
  //   throw new ReactionError("invalid-payment", error.message);
  // }
}
