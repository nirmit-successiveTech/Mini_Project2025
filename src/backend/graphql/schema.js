export const typeDefs = `
  type Food {
    title:String!,
    description:String!, 
    imageUrl:String!,
    userId:Id!
  }

  type Query {
    foods: [Food!]!
  }

  type Subscription {
    foodAdded: Food!
  }
`;
