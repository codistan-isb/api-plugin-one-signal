import pkg from "../package.json";
import { STRIPE_PACKAGE_NAME } from "./util/constants.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";

// import stripeCapturePayment from "./util/stripeCapturePayment.js";
// import stripeCreateAuthorizedPayment from "./util/stripeCreateAuthorizedPayment.js";
// import stripeCreateRefund from "./util/stripeCreateRefund.js";
// import stripeListRefunds from "./util/stripeListRefunds.js";
// import getStripeInstance from "./util/getStripeInstance";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "OneSignal",
    name: STRIPE_PACKAGE_NAME,
    version: pkg.version,
    collections: {
      Feedback: {
        name: "Feedback",
      },
    },
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
    queries,
    paymentMethods: [
      {
        name: "OneSignal",
        canRefund: true,
        displayName: "OneSignal",
        // functions: {
        //   stripeInstance: getStripeInstance,
        //   // capturePayment: stripeCapturePayment,
        //   // createAuthorizedPayment: stripeCreateAuthorizedPayment,
        //   // createRefund: stripeCreateRefund,
        //   // listRefunds: stripeListRefunds,
        // },
      },
    ],
  });
}
