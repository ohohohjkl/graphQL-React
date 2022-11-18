import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { QUERY_ALL_TODO } from "../queries";
import { onGetTodo } from "../redux/actions";

export const useGetTodos = () => {
  const [getTodos, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery(QUERY_ALL_TODO, { nextFetchPolicy: "no-cache" });

  const dispatcher = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await getTodos();
    }
    fetchData();
  }, [getTodos]);

  useEffect(() => {
    if (data) {
      console.log({ data });
      dispatcher(onGetTodo(data?.todos));
    }
  }, [data]);

  const handleRefetching = () => refetch();

  return {
    getTodos,
    dataGetAll: data,
    loading,
    error,
    refetch,
    networkStatus,
    handleRefetching,
  };
};
