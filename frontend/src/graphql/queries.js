import { gql } from "@apollo/client"

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`

export const CURRENT_USER = GET_ME

export const GET_USER_LISTS = gql`
  query GetUserLists($userId: ID!) {
    getUserLists(userId: $userId) {
      id
      userId
      name
      description
      tags
      isRanked
      isPublic
      createdAt
      updatedAt
      movies {
        tmdbId
        title
        posterPath
        releaseDate
        order
      }
    }
  }
`

export const GET_LIST = gql`
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      userId
      name
      description
      tags
      isRanked
      isPublic
      createdAt
      updatedAt
      movies {
        tmdbId
        title
        posterPath
        releaseDate
        order
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`

export const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      tmdbId
      title
      releaseYear
      posterPath
    }
  }
`
