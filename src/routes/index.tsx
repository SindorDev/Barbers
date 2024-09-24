import { Navigate, useRoutes } from "react-router-dom";
import { SuspenseElement as Suspense } from "../utils";
import { lazy } from "react";
const Home = lazy(() => import("./home/Home"));
const Private = lazy(() => import("./private/Private"));
const AuthController = lazy(() => import("./auth/AuthController"));
const SignIn = lazy(() => import("./auth/sign-in/SignIn"));
const SignUp = lazy(() => import("./auth/sign-up/SignUp"));
const Protected = lazy(() => import("./protected/Protected"));
const Profile = lazy(() => import("./profile/Profile"));
import { useSelector } from "react-redux";
import Dashboard from "./dashboard/Dashboard";
const RoutesController = () => {
  const { token } = useSelector((state: any) => state.auth);
  // const [role, setRole] = useState(null);
  // useEffect(() => {
  //   if (token) {
  //     setRole(JSON.parse(atob(token.split(".")[1]))?.id);
  //   }
  // }, [token]);

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
            // {
            //   index: true,
            //   path: "",
            //   element: role === "admin" ? <Suspense> </> </Suspense> : <Navigate to="/dashboard/liked-products"/>
            // },
          ],
        },
      ],
    },
  ]);
};

export default RoutesController;
