import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client"

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:3000/",
  credentials: "include", // Include cookies for authentication
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    },
    query: {
      errorPolicy: "all",
      fetchPolicy: "cache-first",
    },
  },
})

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
