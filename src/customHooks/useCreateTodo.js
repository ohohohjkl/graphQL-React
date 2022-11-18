import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../queries";
import { onCreateTodo } from "../redux/actions";

export const useCreateTodo = () => {
  const [addTodo, { data }] = useMutation(ADD_TODO);
  const dispatcher = useDispatch();

  const handleCreate = () => {
    
    addTodo();
  };

  useEffect(() => {
    if (data?.addTodo) {
      dispatcher(onCreateTodo(data.addTodo));
    }
  }, [data]);

  return { handleCreate, dataUpdate: data };
};
