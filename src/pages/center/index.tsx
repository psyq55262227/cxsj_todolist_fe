import { apiGET, apiPUT } from "@/api";
import { FC, ReactElement, useEffect, useState } from "react";
import { Button, Form, Radio } from "semantic-ui-react";
import swal from "sweetalert";

const Center: FC = (): ReactElement => {
  const [sex, setSex] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const handleEdit = async () => {
    if (!name || !age || !phone || !pwd) return swal({ title: '请填写完整信息', icon: 'error' });
    try {
      const { data: { message } } = await apiPUT('/user', { name, age, phone, password: pwd, sex });
      swal({
        title: message,
        icon: 'success'
      })
    } catch (e) {
      console.log(e);
    }
  }
  const getInfo = async () => {
    try {
      const { data: { name, phone, sex, age } } = await apiGET('/user');
      setName(name);
      setPhone(phone);
      setSex(sex);
      setAge(age)
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getInfo();
  }, [])
  return (
    <section className="w-1/2 mx-auto h-full flex items-center">
      <Form className="w-full flex flex-col justify-center space-y-4 p-8 bg-gray-100/70 rounded-lg my-16 shadow-md">
        <Form.Field>
          <label>昵称</label>
          <input placeholder='请输入昵称' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>年龄</label>
          <input placeholder='请输入年龄' value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>性别</label>
          <section className="space-x-4">
            <Radio
              label='男'
              name='male'
              value='male'
              checked={sex === 0}
              onChange={() => setSex(0)}
            />
            <Radio
              label='女'
              name='female'
              value='female'
              checked={sex !== 0}
              onChange={() => setSex(1)}
            />
          </section>
        </Form.Field>
        <Form.Field>
          <label>手机号</label>
          <input placeholder='请输入手机号' value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>密码</label>
          <input placeholder='请输入密码' value={pwd} type="password" onChange={(e) => setPwd(e.target.value)} />
        </Form.Field>
        <Button type='submit' fluid color="yellow" onClick={() => handleEdit()}>修改</Button>
      </Form>
    </section>
  )
}
export default Center;