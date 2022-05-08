import { timeFormatter } from "@/utils/tool";
import { FC, ReactElement, useState } from "react";
import { Button, Checkbox, Input, Modal } from "semantic-ui-react";
import { ITodo } from ".";

interface IProps {
  todoItem: ITodo;
  handleDeleteItem: (todoItems: ITodo) => void;
  handleEditItem: (todoItem: ITodo) => void
}
const TodoItem: FC<IProps> = ({ todoItem, handleDeleteItem, handleEditItem }): ReactElement => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [content, setContent] = useState(todoItem.content);
  const handleEditContent = () => {
    handleEditItem({ ...todoItem, content, editTime: new Date().getTime() })
    setIsEdit(false);
  }
  const handleDelContent = () => {
    handleDeleteItem(todoItem);
    setIsDelete(false)
  }
  return (
    <>
      <section className={`break-all grid grid-cols-[1fr,auto,auto,auto] items-center gap-2 bg-yellow-500/20 rounded-md p-2 px-4 cursor-pointer`}>
        <span
          className={`${todoItem.completed ? 'line-through' : ''} outline-none`}
          onClick={() => setIsCheck(true)}
        >{todoItem.content}</span>
        <Button color="red" size="mini" onClick={() => setIsDelete(true)}>删除</Button>
        <Button color="yellow" size="mini" onClick={() => setIsEdit(true)}>修改</Button>
        <Checkbox
          onChange={() => handleEditItem({ ...todoItem, completed: !todoItem.completed, editTime: new Date().getTime() })}
          checked={todoItem.completed}
        />
      </section >
      <Modal
        dimmer="blurring"
        open={isEdit}
        onClose={() => setIsEdit(false)}
      >
        <Modal.Header>修改todo内容</Modal.Header>
        <Modal.Content>
          <Input fluid value={content} onChange={(e) => setContent(e.target.value)} />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsEdit(false)}>
            放弃修改
          </Button>
          <Button positive onClick={() => handleEditContent()}>
            确认修改
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        dimmer="blurring"
        open={isCheck}
        onClose={() => setIsCheck(false)}
      >
        <Modal.Header>查看todo内容</Modal.Header>
        <Modal.Content>
          <section className="flex flex-col space-y-2">
            <span>内容：{todoItem.content}</span>
            <span>完成情况：{todoItem.completed ? '已完成' : '待做'}</span>
            <span>指派人：{todoItem.publisherPhone}</span>
            <span>创建时间：{timeFormatter(todoItem.createTime)}</span>
            <span>最后修改时间：{timeFormatter(todoItem.editTime)}</span>
          </section>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setIsCheck(false)}>
            确认
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        dimmer="blurring"
        open={isDelete}
        onClose={() => setIsDelete(false)}
      >
        <Modal.Header>确认要删除吗</Modal.Header>
        <Modal.Content>
          该操作将不可逆
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsDelete(false)}>
            放弃删除
          </Button>
          <Button negative onClick={() => handleDelContent()}>
            确认删除
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}
export default TodoItem;