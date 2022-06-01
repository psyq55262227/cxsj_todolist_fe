import { FC, ReactElement, useEffect, useState } from "react";
// import socket from '@/model/socket'
import { Icon } from "semantic-ui-react";

const Notify: FC = (): ReactElement => {

  useEffect(() => {
    // createSocket();
    // socket.on('getMessage', (e) => {
    //   console.log(e)
    // })
  }, [])
  return (
    <section>
      <Icon name="info circle" />
      <span>消息</span>
    </section>
  )
}
export default Notify;