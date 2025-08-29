import { Food } from "../models/foodModel.js";
import { pubsub } from "./pubsub.js";


export const resolvers = {
  Query: {
    foods: async () => await Food.find(),
  },
  Subscription: {
    foodAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["FOOD_TOPIC"]),
    },
  },
};
