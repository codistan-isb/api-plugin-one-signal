// import { decodeCartOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

export default async function createFeedback(
  parentResult,
  { input },
  context,
  info
) {
  const feedbackResp = await context.mutations.createFeedback(context, input);
  return feedbackResp;
}
