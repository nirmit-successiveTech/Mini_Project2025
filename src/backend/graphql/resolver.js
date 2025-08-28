

import { Food } from "../models/foodModel.js";
import { pubsub } from "./pubsub.js";


const FOOD_TOPIC = "FOOD_TOPIC";

export const resolvers = {
  Query: {
    foods: async () => await Food.find(),
  },
  Subscription: {
    foodAdded: {
      subscribe: () => pubsub.asyncIterator([FOOD_TOPIC]),
    },
  },
};
