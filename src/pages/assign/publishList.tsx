import { apiDELETE, apiGET } from "@/api";
import { timeFormatter } from "@/utils/tool";
import { useState, useEffect, FC, ReactElement, Dispatch } from "react";
import { Table, Button, Modal } from "semantic-ui-react"
import swal from "sweetalert";
import { IPublishAction, IPublishItem } from ".";

interface IProps {
  publishList: IPublishItem[];
  dispatch: Dispatch<{ type: IPublishAction; payload?: IPublishItem; init?: IPublishItem[]; }>
}
const PublishList: FC<IProps> = ({ publishList, dispatch }): ReactElement => {
  const [open, setOpen] = useState(false);
  const [checkedId, setCheckedId] = useState(-1);
  const getPublishedList = async () => {
    try {
      const { data } = await apiGET('/publishList');
      const init: IPublishItem[] = data.map(({ assignedPhone, content, created_at, isCompleted, id }) => ({ assignedPhone, content, created_at, isCompleted, id }))
      dispatch({ type: IPublishAction.INIT, init })
    } catch (e) {
      console.log(e);
    }
  }
  // const handleEdit = async (id: number) => {
  //   try {
  //     const { data } = await apiPUT(`/todo/${id}`);
  //     console.log(data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  const handleDelete = async () => {
    setOpen(false)
    try {
      const { data: { message } } = await apiDELETE(`/todo/${checkedId}`);
      swal({
        title: message,
        icon: 'success'
      })
      dispatch({ type: IPublishAction.DELETE, payload: { id: checkedId } })
    } catch (e) {
      swal({
        title: e.message,
        icon: 'error'
      })
    }
  }
  useEffect(() => {
    getPublishedList();
  }, [])
  return (
    <section className="p-4 space-y-2">
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>已指派清单</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>指派对象</Table.HeaderCell>
            <Table.HeaderCell>指派内容</Table.HeaderCell>
            <Table.HeaderCell>完成情况</Table.HeaderCell>
            <Table.HeaderCell>创建时间</Table.HeaderCell>
            <Table.HeaderCell>操作</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            publishList.length === 0 ?
              <Table.Row>
                <Table.Cell colSpan='5'>暂未发布指派任务</Table.Cell>
              </Table.Row> :
              publishList.map(({ assignedPhone, content, isCompleted, created_at, id }) => (
                <Table.Row key={id}>
                  <Table.Cell>{assignedPhone}</Table.Cell>
                  <Table.Cell>{content}</Table.Cell>
                  <Table.Cell>{isCompleted ? '已完成' : '未完成'}</Table.Cell>
                  <Table.Cell>{timeFormatter(new Date(created_at!).getTime())}</Table.Cell>
                  <Table.Cell>
                    {/* <Button color="yellow" onClick={() => handleEdit(id)}>修改</Button> */}
                    <Button color="red" onClick={() => { setOpen(true); setCheckedId(id) }}>撤销</Button>
                  </Table.Cell>
                </Table.Row>
              ))
          }
        </Table.Body>
      </Table>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>确定要撤销吗</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            该操作不可逆
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            content="删除"
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleDelete()}
            negative
          />
        </Modal.Actions>
      </Modal>
    </section>
  )
}
export default PublishList;