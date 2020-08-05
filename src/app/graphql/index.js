import { ApolloClient, InMemoryCache } from "@apollo/client";

const URL =
    "https://vj0qrrbnk5.execute-api.us-east-1.amazonaws.com/dev/graphql";

export const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});