export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    lists: [UserList!]
  }

  type Movie {
    tmdbId: Int!
    title: String!
    posterPath: String
    releaseDate: String
    order: Int
  }

  type UserList {
    id: ID!
    userId: ID!
    name: String!
    description: String
    tags: [String!]
    isRanked: Boolean!
    isPublic: Boolean!
    movies: [Movie!]
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type SearchMovieResult {
    tmdbId: Int!
    title: String!
    releaseYear: String
    posterPath: String
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

  input MovieInput {
    tmdbId: Int!
    order: Int
  }

  input CreateListInput {
    name: String!
    description: String
    tags: [String!]
    isRanked: Boolean
    isPublic: Boolean
    movies: [MovieInput!]
  }

  type Query {
    me: User!
    getUserLists(userId: ID!): [UserList!]
    getList(id: ID!): UserList
    getAllUsers: [User!]!
    searchMovies(query: String!): [SearchMovieResult!]!
  }

  type Mutation {
    signup(data: SignUpInput!): AuthPayload!
    login(data: LoginInput!): AuthPayload!
    createList(data: CreateListInput!): UserList!
    deleteList(id: ID!): Boolean!
    logout: Boolean!
  }
`;