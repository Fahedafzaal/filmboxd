import { UserListService } from '../../../services/userListService.js';

const userListService = new UserListService();

export const userListResolvers = {
    Query: {
        getUserLists: (_, { userId }, { user }) => userListService.getUserLists(userId, user.id),
        getList: (_, { id }, { user }) => userListService.getList(id, user.id),
        searchMovies: (_, { query }) => userListService.searchMoviesTMDB(query),
    },

    Mutation: {
        createList: async (_, { data }, { user }) => {
            const result = await userListService.createList(user.id, data);
            return result.data;
        },
        deleteList: (_, { id }, { user }) => userListService.deleteList(id, user.id),
    },

    User: {
        lists: (parent, _, { user }) => userListService.getUserLists(parent.id, user.id),
    },
}; 