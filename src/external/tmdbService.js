import tmdb from '../config/tmdb.js';
import { TMDB_API, TMDB_ERROR_MESSAGES } from '../constants/external/index.js';
import { USER_LIST_ERROR_MESSAGES } from '../constants/userList/index.js';
import { AppError } from '../utils/apperror.js';
import { handleTMDBError } from '../utils/tmdbErrorHandler.js';

export class TMDBService {
    async searchMovies(query) {
        try {
            const q = query?.trim()?.toLowerCase();
            if (!q) return [];

            const {
                data: { results },
            } = await tmdb.get(TMDB_API.ENDPOINTS.SEARCH_MOVIE, {
                params: {
                    query: q,
                    include_adult: TMDB_API.PARAMS.INCLUDE_ADULT,
                    language: TMDB_API.PARAMS.LANGUAGE,
                },
            });

            if (!results) {
                throw new Error(TMDB_ERROR_MESSAGES.NO_RESULTS);
            }

            return results.map(({ id, title, release_date, poster_path }) => ({
                tmdbId: id,
                title,
                releaseYear: release_date?.slice(0, 4) || null,
                posterPath: poster_path || null,
            }));
        } catch (error) {
            handleTMDBError(error);
        }
    }

    async getMovieDetails(tmdbId) {
        try {
            const { data: movieDetails } = await tmdb.get(
                `${TMDB_API.ENDPOINTS.MOVIE_DETAILS}/${tmdbId}`
            );

            if (!movieDetails?.title) {
                throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.INVALID_MOVIE_DATA(tmdbId), 400);
            }

            return {
                tmdbId: movieDetails.id,
                title: movieDetails.title,
                posterPath: movieDetails.poster_path || null,
                releaseDate: movieDetails.release_date ? new Date(movieDetails.release_date) : null,
            };
        } catch (error) {
            handleTMDBError(error);
        }
    }


}
