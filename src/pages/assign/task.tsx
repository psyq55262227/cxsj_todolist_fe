import { FC, ReactElement } from "react";
import { Input } from "semantic-ui-react";

interface IProps {
  onChange: (keyWord: string) => void
}
const Task: FC<IProps> = ({ onChange }): ReactElement => {
  return (
    <Input className="row-start-2" fluid placeholder='输入指派事项……' onChange={(e) => onChange(e.target.value)} />
  )
}
export default Task;