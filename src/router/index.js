import { lazy } from 'react';
const Home = lazy(() => import('pages/home'));
const ErrorResult = lazy(() => import('pages/common/error/ErrorResult'));
const AppList = lazy(() => import('pages/app'));
const AppAdd = lazy(() => import('pages/app/components/Add'));

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "*/500",
    component: ErrorResult
  },

  {
    path: "/app/list",
    component: AppList
  },
  {
    path: "/app/add",
    component: AppAdd
  },

  
];
export default routes;
