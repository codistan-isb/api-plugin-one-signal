// import { decodeCartOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.createNotificationIntent
 * @method
 * @memberof Payments/GraphQL
 * @summary resolver for the createStripePaymentIntent GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} [args.input.cartId] - The opaque ID of the cart to retrieve the total from.
 * @param {String} [args.input.shopId] - A shop ID
 * @param {String} [args.input.cartToken] - The anonymous access cartToken that was returned from `createCart`.
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} CreateStripePaymentIntentPayload Object containing the Stripe Payment Intent client secret
 */
export default async function createNotificationIntent(
  parentResult,
  { input },
  context
) {
  const { data } = input;

  console.log("In create notification ", data);
  // console.log("Mutations are ", context.mutations);
  // const cartId = opaqueCartId ? decodeCartOpaqueId(opaqueCartId) : null;
  // const shopId = decodeShopOpaqueId(opaqueShopId);

  const paymentIntentClientSecret =
    await context.mutations.oneSignalCreateNotification(context, {
      data,
    });

  console.log("paymentIntentClientSecret ", paymentIntentClientSecret);

  return paymentIntentClientSecret;
}
