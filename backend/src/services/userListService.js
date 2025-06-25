import { UserListRepository } from '../repositories/userListRepository.js';
import { TMDBService } from '../external/tmdbService.js';
import { validateListInput } from '../utils/validators/index.js';
import { AppError } from '../utils/apperror.js';
import { USER_LIST_ERROR_MESSAGES } from '../constants/userList/index.js';
import { dedupeMovies } from '../utils/duplicateMovieCheck.js';

export class UserListService {
    constructor() {
        this.userListRepository = new UserListRepository();
        this.tmdbService = new TMDBService();
    }

    async searchMoviesTMDB(query) {
        return this.tmdbService.searchMovies(query);
    }

    async createList(userId, { name, description, tags, isRanked, isPublic, movies }) {
        validateListInput(userId, { name, description, tags, isRanked, isPublic, movies });

        // Fetch full movie details for each tmdbId
        const moviesWithDetails = await Promise.all(
            (movies || []).map(async (movie) => {
                const details = await this.tmdbService.getMovieDetails(movie.tmdbId);
                return {
                    tmdbId: movie.tmdbId,
                    title: details.title,
                    posterPath: details.posterPath,
                    releaseDate: details.releaseDate,
                    order: movie.order,
                };
            })
        );

        const newList = await this.userListRepository.create({
            userId,
            name,
            description: description || '',
            tags: tags || [],
            isRanked: isRanked || false,
            isPublic: isPublic ?? true,
            movies: dedupeMovies(moviesWithDetails),
        });

        if (!newList) {
            throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.SAVE_FAILED, 500);
        }

        return {
            success: true,
            message: 'List created successfully',
            data: newList,
        };
    }

    async deleteList(id, userId) {
        const result = await this.userListRepository.findOneAndDelete(id, userId);
        if (!result) {
            throw new AppError(USER_LIST_ERROR_MESSAGES.LIST_NOT_FOUND_OR_UNAUTHORIZED, 404);
        }
        return true;
    }

    async getUserLists(userId, requestingUserId) {
        const isSameUser = String(userId) === String(requestingUserId);
        return await this.userListRepository.findUserLists(userId, isSameUser ? null : true);
    }

    async getList(id, requestingUserId) {
        const list = await this.userListRepository.findById(id);
        if (!list) {
            throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.NOT_FOUND, 404);
        }

        const isOwner = String(list.userId) === String(requestingUserId);
        if (!isOwner && !list.isPublic) {
            throw new AppError(USER_LIST_ERROR_MESSAGES.UNAUTHORIZED, 403);
        }

        return list;
    }
}
