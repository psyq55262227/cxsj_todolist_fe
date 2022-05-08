import { apiDELETE, apiGET, apiPOST, apiPUT } from "@/api";
import { FC, ReactElement, useEffect, useReducer } from "react";
import swal from "sweetalert";
import Card from "./card";
import Ipt from "./ipt";

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  createTime: number;
  editTime: number;
  assignedPhone?: string;
  publisherPhone?: string;
}
export enum ITodoAction {
  INIT,
  ADD,
  DELETE,
  EIDT
}
const Todo: FC = (): ReactElement => {
  const handleGetTodo = async (): Promise<void | ITodo[]> => {
    try {
      const { data } = await apiGET('/todoList');
      const payload = data.map(({ assignedPhone, content, created_at, id, isCompleted, publisherPhone, updated_at }) => ({ assignedPhone, content, id, completed: isCompleted, createTime: created_at, editTime: updated_at, publisherPhone }))
      dispatch({ type: ITodoAction.INIT, payload })
    } catch (e) {
      console.log(e)
    }
  }
  const handleAddTodo = async ({ content, completed, id }: ITodo) => {
    try {
      const { data: { message } } = await apiPOST('/todo', { id, content, isCompleted: completed });
      swal({
        title: message,
        icon: 'success'
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handleDeleteTodo = async (id: number) => {
    try {
      const { data: { message } } = await apiDELETE(`/todo/${id}`);
      swal({
        title: message,
        icon: 'success'
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handleEditTodo = async (data: ITodo) => {
    try {
      const { id, content, completed: isCompleted } = data;
      const { data: { message } } = await apiPUT(`/todo`, { id, content, isCompleted });
      swal({
        title: message,
        icon: 'success'
      })
    } catch (e) {
      console.log(e)
    }
  }
  const [todoItems, dispatch] = useReducer((state: ITodo[], { type, payload }) => {
    console.log(state)
    switch (type) {
      case ITodoAction.INIT:
        return payload;
      case ITodoAction.ADD:
        handleAddTodo(payload);
        return [...state, payload];
      case ITodoAction.EIDT:
        handleEditTodo(payload)
        return state.map((item: ITodo) => item.id === payload.id ? payload : item)
      case ITodoAction.DELETE:
        handleDeleteTodo(payload.id)
        return state.filter((item: ITodo) => item.id !== payload.id)
      default:
        return state;
    }
  }, []);
  useEffect(() => {
    handleGetTodo();
  }, [])
  return <section className="p-8">
    <Ipt handleAddItem={(payload: ITodo) => dispatch({ type: ITodoAction.ADD, payload })} />
    <main className="grid grid-cols-2 gap-4 my-2">
      <Card
        title="未完成"
        todoItems={todoItems.filter(({ completed }) => !completed)}
        handleDeleteItem={(payload: ITodo) => dispatch({ type: ITodoAction.DELETE, payload })}
        handleEditItem={(payload: ITodo) => dispatch({ type: ITodoAction.EIDT, payload })}
      />
      <Card
        title="已完成"
        todoItems={todoItems.filter(({ completed }) => completed)}
        handleDeleteItem={(payload: ITodo) => dispatch({ type: ITodoAction.DELETE, payload })}
        handleEditItem={(payload: ITodo) => dispatch({ type: ITodoAction.EIDT, payload })}
      />
    </main>
  </section>
}
export default Todo;