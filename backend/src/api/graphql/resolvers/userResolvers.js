import { UserService } from '../../../services/userService.js';

const userService = new UserService();

export const userResolvers = {
  Query: {
    me: (_, __, { user }) => user,
    getAllUsers: () => userService.getAllUsers()
  },

  Mutation: {
    signup: (_, { data }) => userService.createUser(data),
    login: (_, { data }) => userService.loginUser(data)
  }
};