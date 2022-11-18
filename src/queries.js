import { gql } from "@apollo/client";

export const QUERY_ALL_TODO = gql`
  query getTodo {
    todos {
      id
      type
    }
  }
`;

export const QUERY_BY_ID_TODO = gql`
  query getTodoWithId($id: String!) {
    todo(id: $id) {
      id
      type
    }
  }
`;

export const ADD_TODO = gql`
  mutation testAddTodo {
    addTodo(type: "test") {
      id
      type
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation testUpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

export const DELETE_TODO = gql`
  mutation testDeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

export const FILMS_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export const FILMS_QUERY_DYNAMIC = gql`
  query getPaginationList($limit: Int!) {
    launchesPast(limit: $limit) {
      id
      mission_name
    }
  }
`;

// const [
//   getDog,
//   { loading, error, data, startPolling, stopPolling, refetch, networkStatus },
// ] = useLazyQuery(FILMS_QUERY_DYNAMIC, {
//   variables: { limit },
//   notifyOnNetworkStatusChange: true,
//   errorPolicy: "all",
//   fetchPolicy: "network-only", // Doesn't check cache before making a network request | cache-first
//   nextFetchPolicy: "cache-first", // Used for subsequent executions
//   // pollInterval: 5000, //refetch with pollInterval - params of start/stopPolling
// });
