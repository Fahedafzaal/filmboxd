import { UserListService } from '../../../services/userListService.js';

const userListService = new UserListService();

export const userListResolvers = {
    Query: {
        getUserLists: (_, { userId }, { user }) => userListService.getUserLists(userId, user.id),
        getList: (_, { id }, { user }) => userListService.getList(id, user.id),
        searchMovies: (_, { query }) => userListService.searchMoviesTMDB(query),
    },

    Mutation: {
        createList: (_, { data }, { user }) => userListService.createList(user.id, data),
        deleteList: (_, { id }, { user }) => userListService.deleteList(id, user.id),
    },

    User: {
        lists: (parent, _, { user }) => userListService.getUserLists(parent.id, user.id),
    },
}; 