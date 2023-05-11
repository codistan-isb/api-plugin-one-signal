import ReactionError from "@reactioncommerce/reaction-error";
import hashToken from "@reactioncommerce/api-utils/hashToken.js";
import xformCartCheckout from "@reactioncommerce/api-plugin-carts/src/xforms/xformCartCheckout.js";
import getStripeInstance from "../util/getStripeInstance.js";
import OneSignal2 from "onesignal-node";
/**
 * @method oneSignalCreateNotification
 * @summary Creates a Stripe Payment Intent and return the client secret
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Necessary input. See SimpleSchema
 * @return {Promise<String>} String with the client secret of the Payment Intent
 */

export default async function oneSignalCreateNotification(context, { data }) {
  console.log("In one Signal Mutation ", data);
  const client2 = new OneSignal2.Client(
    "3bdc5391-8b89-43b1-a04b-0d9f8fb832d6",
    "ZjA3ZTg5NWUtZDA4Zi00MTBmLTkzMTItYzczYjBlMTJmMzg4"
  );
  console.log(
    "notification arguments "
    // message,
    // id,
    // type,
    // userId,
    // secondaryId
  );

  // const notification = {
  //   contents: {
  //     en: "Shoaib new message",
  //   },
  //   data: {
  //     id: "123",
  //     type: "new message",
  //   },
  //   include_external_user_ids: ["456"],
  // };

  // const respons = await client2.addDevice({
  //   device_type: 5,
  //   identifier: "id1",
  // });
  // console.log(respons.body);

  // return {
  //   msg: data,
  // };

  const notification = {
    contents: {
      en: "Hello, world!",
    },
    include_external_user_ids: ["12345"],
  };
  console.log("notification obj is  ", notification);

  // let dataview = await client2.viewDevice(
  //   "4993d6b6-fef5-4b4a-bcbd-7e69e6d967c9"
  // );
  // console.log("Data view is ", dataview);
  const response = await client2.createNotification(notification);
  console.log("Response is ", response);

  return {
    msg: data,
  };

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
