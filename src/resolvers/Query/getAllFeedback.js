// import { decodeCartOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

import ReactionError from "@reactioncommerce/reaction-error";
import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
export default async function getAllFeedback(parent, args, context, info) {
  // console.log("args ", args);
  if (context.user === undefined || context.user === null) {
    throw new ReactionError(
      "access-denied",
      "Unauthorized access. Please Login First"
    );
  }
  const { searchQuery, ...connectionArgs } = args;
  const feedbackResp = await context.queries.getAllFeedback(context, {
    connectionArgs,
    searchQuery,
  });
  // console.log("feedbackResp ", feedbackResp);
  //   return feedbackResp;
  return getPaginatedResponse(feedbackResp, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info),
  });
}
