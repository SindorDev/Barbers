import { useRoutes } from "react-router-dom";
import { SuspenseElement as Suspense } from "../utils";
import { lazy } from "react";
const Home = lazy(() => import("./home/Home"))
const RoutesController = () => {
  return useRoutes([
    {
      path: "/",
      element: <Suspense><Home/></Suspense>
    }
  ])
}

export default RoutesController