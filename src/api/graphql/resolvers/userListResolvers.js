import { Query } from 'mongoose';
import {
    createList,
    deleteList,
    getUserLists,
    getList,
    searchMoviesTMDB,
} from '../../../services/userListService.js';

export const userListResolvers = {
    Query: {
        getUserLists: (_, {userId}, {user}) => getUserLists(userId, user.id),
        getList: (_, {id}, {user}) => getList(id, user.id),
        searchMovies: (_parent, {query}) => searchMoviesTMDB(query),
    },

    Mutation: {
        createList: (_, {data}, {user}) => createList(user.id, data),
        deleteList: (_, {id}, {user}) => deleteList(id, user.id),
    },

    User: {
        lists: (parent, _args, {user}) => getUserLists(parent.id, user.id),
    },
}; 