import { createUser, loginUser, getAllUsers } from '../../../services/userService.js';

export const userResolvers = {
  Query: {
    me: (_, __, { user }) => user,
    getAllUsers: () => getAllUsers()
  },

  Mutation: {
    signup: (_, { data }) => createUser(data),
    login: (_, { data }) => loginUser(data)
  }
};