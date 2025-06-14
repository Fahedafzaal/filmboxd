import { UserList } from '../models/userListModel.js';
import tmdb from '../config/tmdb.js';
import { dedupeMovies } from '../utils/helpers.js';
import { TMDB_API, ERROR_MESSAGES, SORT_OPTIONS } from '../constants/userListConstants.js';
import { validateListInput, validateMovieInput } from '../utils/validators.js';
import { AppError } from '../utils/apperror.js';

export async function searchMoviesTMDB(query) {
    try {
        const q = query?.trim()?.toLowerCase();
        if (!q) return [];

        const {
            data: { results }
        } = await tmdb.get(TMDB_API.ENDPOINTS.SEARCH_MOVIE, {
            params: {
                query: q,
                include_adult: TMDB_API.PARAMS.INCLUDE_ADULT,
                language: TMDB_API.PARAMS.LANGUAGE,
            }
        });

        if (!results) {
            throw new Error(ERROR_MESSAGES.TMDB.NO_RESULTS);
        }

        return results.map(
            ({ id, title, release_date, poster_path }) => ({
                tmdbId: id,
                title,
                releaseYear: release_date?.slice(0, 4) || null,
                posterPath: poster_path || null,
            })
        );
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    throw new Error(ERROR_MESSAGES.TMDB.INVALID_KEY);
                case 404:
                    throw new Error(ERROR_MESSAGES.TMDB.ENDPOINT_NOT_FOUND);
                case 429:
                    throw new Error(ERROR_MESSAGES.TMDB.RATE_LIMIT);
                default:
                    throw new Error(`TMDB API error: ${error.response.status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            throw new Error(ERROR_MESSAGES.TMDB.NO_RESPONSE);
        } else {
            throw new Error(`Error searching movies: ${error.message}`);
        }
    }
}

export async function createList(userId, data) {
    try {
        validateListInput(userId, data);

        const moviesWithDetails = await Promise.all(
            data.movies?.map(async (movie) => {
                validateMovieInput(movie);

                try {
                    const { data: movieDetails } = await tmdb.get(`${TMDB_API.ENDPOINTS.MOVIE_DETAILS}/${movie.tmdbId}`);
                    
                    if (!movieDetails?.title) {
                        throw new AppError(ERROR_MESSAGES.LIST.INVALID_MOVIE_DATA(movie.tmdbId), 400);
                    }

                    return {
                        tmdbId: movie.tmdbId,
                        title: movieDetails.title,
                        posterPath: movieDetails.poster_path || null,
                        releaseDate: movieDetails.release_date ? new Date(movieDetails.release_date) : null,
                        order: movie.order || 0
                    };
                } catch (error) {
                    throw new AppError(ERROR_MESSAGES.LIST.FAILED_TO_FETCH_MOVIE(movie.tmdbId, error), 500);
                }
            }) || []
        );

        const list = new UserList({
            userId,
            name: data.name,
            description: data.description || '',
            tags: data.tags || [],
            isRanked: data.isRanked || false,
            isPublic: data.isPublic !== undefined ? data.isPublic : true,
            movies: moviesWithDetails
        });

        const validationError = list.validateSync();
        if (validationError) {
            throw new AppError(validationError.message, 400);
        }

        const savedList = await list.save();
        if (!savedList) {
            throw new AppError(ERROR_MESSAGES.LIST.SAVE_FAILED, 500);
        }

        return {
            id: savedList._id.toString(),
            userId: savedList.userId.toString(),
            name: savedList.name,
            description: savedList.description,
            tags: savedList.tags,
            isRanked: savedList.isRanked,
            isPublic: savedList.isPublic,
            movies: savedList.movies,
            createdAt: savedList.createdAt.toISOString(),
            updatedAt: savedList.updatedAt.toISOString()
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(error.message, 500);
    }
}

export async function deleteList(id, userId) {
    const result = await UserList.findOneAndDelete({ _id: id, userId });
    if (!result) throw new Error(ERROR_MESSAGES.LIST_NOT_FOUND_OR_UNAUTHORIZED);
    return true;
}

export async function getUserLists(userId, requestingUserId) {
    const sameUser = String(userId) === String(requestingUserId);
    const query = sameUser
        ? { userId }
        : { userId, isPublic: true };
    return await UserList.find(query)
        .sort(SORT_OPTIONS.UPDATED_AT_DESC)
        .lean();
}

export async function getList(id, requestingUserId) {
    const list = await UserList.findById(id).lean();
    if (!list) throw new Error(ERROR_MESSAGES.LIST_NOT_FOUND);
    if (
        String(list.userId) !== String(requestingUserId) &&
        !list.isPublic
    ) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }
    return list;
}