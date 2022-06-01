import { apiPOST } from "@/api";
import socket from "@/model/socket";
import { timeFormatter } from "@/utils/tool";
import { FC, ReactElement, useEffect, useReducer, useState } from "react"
import { Button, } from "semantic-ui-react";
import swal from "sweetalert";
import AssignedList from "./assignedList";
import PublishList from "./publishList";
import SearchUser from "./searchUser";
import Task from "./task";

export interface IPublishItem {
  id: number;
  content: string;
  isCompleted: boolean;
  assignedPhone: string;
  created_at?: string;
}
export enum IPublishAction {
  INIT,
  DELETE,
  ADD,
  EIDT
}
const Assign: FC = (): ReactElement => {
  const [user, setUser] = useState('');
  const [task, setTask] = useState('');
  const [publishList, dispatch] = useReducer((state: IPublishItem[], { type, payload, init }: { type: IPublishAction, payload: IPublishItem, init: IPublishItem[] }) => {
    switch (type) {
      case IPublishAction.INIT:
        return init
      case IPublishAction.ADD:
        return [...state, payload];
      case IPublishAction.EIDT:
        return state.map((item: IPublishItem) => item.id === payload.id ? payload : item)
      case IPublishAction.DELETE:
        return state.filter((item: IPublishItem) => item.id !== payload.id)
      default:
        return state;
    }
  }, [])
  const handleAssign = async () => {
    if (task === '' || user === '') return swal('请补充完整todo内容')
    const payload: IPublishItem = {
      id: new Date().getTime(), content: task, isCompleted: false, assignedPhone: user,
    };
    try {
      const { data: { message } } = await apiPOST('/todo', payload)
      dispatch({ type: IPublishAction.ADD, payload: { ...payload, created_at: timeFormatter(new Date()) } })
      handleRealTimeDisplay(task, user)
    } catch (e) {
      console.log(e);
    }
  }
  const handleRealTimeDisplay = (content: string, phone: string) => {
    socket.emit('submitTask', {
      content,
      to: phone
    })
  }
  return (
    <>
      <section className="p-4 grid grid-cols-[auto,1fr,auto] gap-2">
        <header className="font-bold">指派用户</header>
        <header className="font-bold">指派内容</header>
        <SearchUser onChange={(phone: string) => setUser(phone)} />
        <Task onChange={(task: string) => setTask(task)} />
        <Button color="yellow" className="row-start-2" onClick={() => handleAssign()}>指派</Button>
      </section>
      <PublishList publishList={publishList} dispatch={dispatch} />
      <AssignedList />
    </>
  )
}
export default Assign;