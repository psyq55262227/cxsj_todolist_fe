import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import socket from './model/socket'
import cogoToast from 'cogo-toast';

function App() {
  const createSocket = () => {
    socket.emit('enter')
  }
  const getTask = () => {
    socket.on('getTask', ({ content, from }) => {
      cogoToast.info(
        <section>
          <header>你有一条来自用户<span className='text-yellow-700 mx-1 font-bold'>{from}</span>的新任务</header>
          <span className='text-gray-600 text-xl font-extrabold'>{content}</span>
        </section>
      );
    })
  }
  useEffect(() => {
    createSocket();
    getTask()
  }, [])
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
