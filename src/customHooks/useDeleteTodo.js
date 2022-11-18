import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DELETE_TODO } from "../queries";
import { onDeleteTodo } from "../redux/actions";

export const useDeleteTodo = () => {
  const [deleteTodo, { data }] = useMutation(DELETE_TODO);
  const dispatcher = useDispatch();

  const handleDelete = (id) => {
    deleteTodo({
      variables: { id },
    });
  };

  useEffect(() => {
    if (data?.deleteTodo) {
      console.log(data?.deleteTodo);
      dispatcher(onDeleteTodo(data?.deleteTodo));
    }
  }, [data]);

  return { handleDelete, dataDelete: data };
};
