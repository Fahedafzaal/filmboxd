import { UserService } from '../../../services/userService.js';
import { setAuthCookie, clearAuthCookie } from '../../../utils/auth.js';

const userService = new UserService();

export const userResolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user || null;
    }
  },

  Mutation: {
    signup: async (_, { data }, { res }) => {
      const { user, token } = await userService.createUser(data);
      setAuthCookie(res, token);
      return { user, token };
    },
    login: async (_, { data }, { res }) => {
      const result = await userService.loginUser(data);
      setAuthCookie(res, result.token);
      return result;
    },
    logout: async (_, __, { res }) => {
      clearAuthCookie(res);
      return true;
    }
  }
};