import { apiGET } from "@/api";
import { timeFormatter } from "@/utils/tool";
import { FC, ReactElement, useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";

interface IList {
  publisherPhone: string;
  created_at: string;
  update_at: string;
  content: string;
  isCompleted: boolean;
  id: string;
}
const AssignedList: FC = (): ReactElement => {
  const [list, setList] = useState<IList[]>([]);
  const getAssignedList = async () => {
    try {
      const { data } = await apiGET('/assignedList');
      setList(data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getAssignedList();
  }, [])
  return (
    <section className="p-4 space-y-2">
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>被指派清单</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>指派者</Table.HeaderCell>
            <Table.HeaderCell>指派内容</Table.HeaderCell>
            <Table.HeaderCell>完成情况</Table.HeaderCell>
            <Table.HeaderCell>创建时间</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            list.length === 0 ?
              <Table.Row>
                <Table.Cell colSpan='5'>暂未被指派任务</Table.Cell>
              </Table.Row> :
              list.map(({ publisherPhone, content, isCompleted, created_at, id }) => (
                <Table.Row key={id}>
                  <Table.Cell>{publisherPhone}</Table.Cell>
                  <Table.Cell>{content}</Table.Cell>
                  <Table.Cell>{isCompleted ? '已完成' : '未完成'}</Table.Cell>
                  <Table.Cell>{timeFormatter(new Date(created_at!).getTime())}</Table.Cell>
                </Table.Row >
              ))
          }
        </Table.Body >
      </Table >
    </section >
  )
}
export default AssignedList;