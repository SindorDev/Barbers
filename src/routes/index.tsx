import { useRoutes } from "react-router-dom";
import { SuspenseElement as Suspense } from "../utils";
import { lazy } from "react";
const Home = lazy(() => import("./home/Home"))
const AuthController = lazy(() => import("./auth/AuthController"))
import SignIn from "./auth/sign-in/SignIn";
import SignUp from "./auth/sign-up/SignUp";
import Profile from "./profile/Profile";
const RoutesController = () => {
  return useRoutes([
    {
      path: "/",
      element: <Suspense><Home/></Suspense>
    },
    {
      path: "auth",
      element: <Suspense> <AuthController/> </Suspense>,
      children: [
        {
          path: "",
          element: <Suspense> <SignIn/> </Suspense>,
        },
        {
          path: "register",
          element: <Suspense> <SignUp/> </Suspense>
        }
      ]
    },
    {
      path: "/profile",
      element: <Suspense> <Profile/> </Suspense>
    }
  ])
}

export default RoutesController