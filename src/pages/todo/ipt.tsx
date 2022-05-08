import { FC, ReactElement, useState } from "react";
import { Button, Input } from "semantic-ui-react"
import swal from "sweetalert";
import { ITodo } from ".";

interface IProps {
  handleAddItem: (todoItem: ITodo) => void;
}
const Ipt: FC<IProps> = ({ handleAddItem }): ReactElement => {
  const [content, setContent] = useState('')
  const handleCreateItem = () => {
    if (content.length === 0) return swal({ title: '请输入待办项', icon: 'error' })
    handleAddItem({
      id: new Date().getTime(),
      content,
      completed: false,
      createTime: new Date().getTime(),
      editTime: new Date().getTime(),
    })
    setContent('')
  }
  return (
    <header className="grid grid-cols-[1fr,auto] gap-4">
      <Input placeholder='添加待办项' value={content} fluid onChange={(e) => setContent(e.target.value)} />
      <Button color="yellow" onClick={() => handleCreateItem()}>添加</Button>
    </header>
  )
}
export default Ipt;