export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User!
    getAllUsers: [User]
  }

  type Mutation {
    signup(data: SignUpInput!): AuthPayload!
    login(data: LoginInput!): AuthPayload!
  }
`;