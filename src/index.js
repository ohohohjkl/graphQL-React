import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "http://localhost:4000/" });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: "asdasdasd",
    },
  };
});

const client = new ApolloClient({
  // uri: "https://api.spacex.land/graphql/",
  uri: "http://localhost:4000/",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      // nextFetchPolicy: "cache-only", //default for all request

      nextFetchPolicy(currentFetchPolicy) {
        if (
          currentFetchPolicy === "network-only" ||
          currentFetchPolicy === "cache-and-network"
        ) {
          // Demote the network policies (except "no-cache") to "cache-first"
          // after the first request.
          return "cache-first";
        }
        // Leave all other fetch policies unchanged.
        return currentFetchPolicy;
      },
    },
  },
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  rootElement
);
