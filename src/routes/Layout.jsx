import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

// 공통 구조

export default function Layout() {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}