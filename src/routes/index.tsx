import { Navigate, useRoutes } from "react-router-dom";
import { SuspenseElement as Suspense } from "../utils";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Home = lazy(() => import("./home/Home"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Users = lazy(() => import("./dashboard/users/Users"));
const Barber = lazy(() => import("./dashboard/barbers/Barber"));
const Private = lazy(() => import("./private/Private"));
const AuthController = lazy(() => import("./auth/AuthController"));
const SignIn = lazy(() => import("./auth/sign-in/SignIn"));
const SignUp = lazy(() => import("./auth/sign-up/SignUp"));
const Protected = lazy(() => import("./protected/Protected"));
const Profile = lazy(() => import("./profile/Profile"));
const Service = lazy(() => import("./dashboard/service/Services"))
const RoutesController = () => {
  const { token } = useSelector((state: any) => state.auth);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (token) {
      setRole(JSON.parse(atob(token.split(".")[1]))?.role);
    }
  }, [token]);

  return useRoutes([
    {

      path: "/",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "auth",
      element: (
        <Suspense>
          <AuthController />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <SignIn />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <SignUp />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/profile",
      element: token ? (
        <Suspense>
          <Protected />
        </Suspense>
      ) : (
        <Navigate to={"/auth"} />
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: token ? (
        <Suspense>
          <Private />
        </Suspense>
      ) : (
        <Navigate to={"/auth"} />
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Dashboard />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: role === "manager" || role === "owner" ? (
                <Suspense>
                    <Users/>
                </Suspense>
              ) : (
                <Navigate to={"/dashboard/barbers"} />
              )
            },
            {
              path: "barbers",
              element: (
                <Suspense>
                    <Barber/>
                </Suspense>
              )
            },
            {
              path: "order",
              element: (
                <Suspense>
                    <Service/>
                </Suspense>
              )
            }

          ],
        },
      ],
    },
  ]);
};

export default RoutesController;
