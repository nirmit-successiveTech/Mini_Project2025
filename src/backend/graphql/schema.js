export const typeDefs = `
  type Food {
  id:ID!
    title:String!,
    description:String!, 
    imageUrl:String!,
    userId:ID!
  }

  type Query {
    foods: [Food!]!
  }

  type Subscription {
    foodAdded: Food!
  }
`;
