import { Outlet } from "react-router"
import Navigation from "../Components/Header/Navigation"

const Layout = () => {
  return (
    <>
    <Navigation />
    <Outlet />
    </>
  )
}

export default Layout