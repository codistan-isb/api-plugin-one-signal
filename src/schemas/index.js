import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const schema = importAsString("./schema.graphql");
const feedback = importAsString("./feedback.graphql");

export default [schema, feedback];
