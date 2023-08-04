import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function createFeedback(context, input) {
  // console.log("input ", input);
  const { Feedback } = context.collections;
  const newFeedbackId = Random.id();

  const {
    customerName,
    customerEmail,
    customerPhone,
    branchName,
    foodRating,
    serviceRating,
    customerRemarks,
    customerOrderId,
  } = input;
  const createdAt = new Date();
  const newFeedback = {
    _id: newFeedbackId,
    customerName,
    createdAt,
    customerEmail,
    isDeleted: false,
    isVisible: true,
    customerPhone,
    branchName,
    foodRating,
    serviceRating,
    updatedAt: createdAt,
    customerRemarks,
    customerOrderId,
  };
  const feedbackResponse = await Feedback.insertOne(newFeedback);
  // console.log("New Feedback ", feedbackResponse);
  if (feedbackResponse?.ops[0]) {
    return feedbackResponse.ops[0];
  } else {
    return null;
  }
}
