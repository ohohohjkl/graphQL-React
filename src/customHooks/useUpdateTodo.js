import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_TODO } from "../queries";
import { onUpdateTodo } from "../redux/actions";

export const useUpdateTodo = ({ ref }) => {
  const [updateTodo, { data }] = useMutation(UPDATE_TODO, {
    refetchQueries: [
    //   { query: QUERY_ALL_TODO }, // DocumentNode object parsed with gql
    //   "GetComments", // Query name
    ],
  });
  const dispatcher = useDispatch();

  const handleUpdate = (e, id) => {
    console.log(ref.current.value);
    e.preventDefault();
    updateTodo({
      variables: { id, type: ref.current.value },
    });
  };

  useEffect(() => {
    if (data?.updateTodo) {
      dispatcher(onUpdateTodo(data.updateTodo));
    }
  }, [data]);

  return { handleUpdate, dataUpdate: data };
};
