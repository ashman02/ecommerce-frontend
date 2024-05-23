import React, { useEffect, useState } from "react"
import { Container } from "../index"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { Loader2, Upload, User } from "lucide-react"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/features/auth/authSlice.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Separator } from "../ui/separator"

const LowerNavbar = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const user = useSelector((state) => state.auth.data)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(authStatus)
  const [isSidebar, setIsSidebar] = useState(false)

  const { toast } = useToast()
  const dispatch = useDispatch()


  useEffect(() => {
    setIsAuthenticated(authStatus)
  }, [authStatus])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await axios.post("/api/v1/users/logout")
      dispatch(logout())
      toast({
        title: "Success",
        description: response.data.message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while logging out",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Categories",
      slug: "/allcategories",
      active: isAuthenticated,
    },
    {
      name: "Cart",
      slug: "/cart",
      active: isAuthenticated,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
  ]

  return (
    <Container>
      <div onClick={() => setIsSidebar(!isSidebar)} className="md:hidden">
        <Menu />
      </div>
      <nav
        className={`flex justify-between md:items-center md:flex-row flex-col w-1/2  gap-10 pl-3 absolute rounded-md md:w-full z-50 md:dark:bg-[#020817] md:bg-[#ffffff] md:gap-0 md:static md:rounded-none md:pl-0 py-3 md:py-0 dark:bg-[#1e2025] bg-[#d4caca] ${isSidebar ? "tanslate-x-0" : "translate-x-[-114%]"} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-sm md:shadow-none dark:shadow-black`}
      >
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                width={45}
                src={user?.avatar ? user.avatar : "/images/default-user.png"}
                alt="user-profile"
                className="cursor-pointer hover:bg-gray-300 duration-300 rounded-full p-1"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavLink to={`/${user.username}`}>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
              </NavLink>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload />
                <span>Upload</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* add drop down menu and make video */}
        <ul className="flex gap-4 md:justify-center md:items-center md:flex-row flex-col">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `md:text-lg font-semibold ${
                      isActive ? "border-solid border-b-2 border-gray-400" : ""
                    } pb-1`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
        {isAuthenticated ? (
          <div className="mt-24 md:mt-0">
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <span>
                    <Loader2 className="animate-spin" />
                  </span>{" "}
                  Logging out
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col md:items-center justify-center gap-3">
            <NavLink to="/sign-in">
              <Button variant="outline">Log-in</Button>
            </NavLink>
            <NavLink to="/sign-up">
              <Button variant="outline">Sign-up</Button>
            </NavLink>
          </div>
        )}
      </nav>
      <Separator className="my-5" />
    </Container>
  )
}

export default LowerNavbar
