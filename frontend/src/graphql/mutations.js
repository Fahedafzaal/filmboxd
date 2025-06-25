import { gql } from "@apollo/client"

export const SIGNUP = gql`
  mutation Signup($data: SignUpInput!) {
    signup(data: $data) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

export const CREATE_LIST = gql`
  mutation CreateList($data: CreateListInput!) {
    createList(data: $data) {
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

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id)
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`