import { FC, ReactElement } from "react";
import { ITodo } from ".";
import Empty from "./empty";
import TodoItem from "./todoItem";

interface IProps {
    title: string;
    todoItems: ITodo[];
    handleDeleteItem: (todoItems: ITodo) => void;
    handleEditItem: (todoItem: ITodo) => void
}
const TodoCard: FC<IProps> = ({ title, todoItems, handleDeleteItem, handleEditItem }): ReactElement => {
    return (
        <section className="p-6 rounded-md shadow-md bg-gray-100/60">
            <header className="text-2xl border-l-6 pl-2 border-yellow-500 text-yellow-900 font-bold">{title}</header>
            <section className="space-y-4 py-4 h-full">
                {
                    todoItems.length === 0 ?
                        <section className="h-full flex justify-center">
                            <Empty />
                        </section>
                        :
                        todoItems.map((item) => (
                            <TodoItem
                                todoItem={item}
                                handleDeleteItem={handleDeleteItem}
                                handleEditItem={handleEditItem}
                            />
                        ))
                }
            </section>
        </section>
    )
}
export default TodoCard;