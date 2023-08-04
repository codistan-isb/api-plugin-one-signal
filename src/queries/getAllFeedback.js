// import { decodeCartOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";
// import applyFeedbackFilters from "../utils/applyFeedbackFilters.js";

export default async function getAllFeedback(context, input) {
  // console.log("Input ", input);
  const { Feedback } = context.collections;
  const feedbackResp = await Feedback.find({});
  return feedbackResp;
}
