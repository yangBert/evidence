import { lazy } from 'react';
const Home = lazy(() => import('pages/home'));
const ErrorResult = lazy(() => import('pages/common/error/ErrorResult'));
const AppList = lazy(() => import('pages/app'));
const EvidenceList = lazy(() => import('pages/evidence'));
const EvidenceAdd = lazy(() => import('pages/evidence/components/Add'));


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
    path: "/evid/list",
    component: EvidenceList
  },
  {
    path: "/evid/add",
    component: EvidenceAdd
  },
];
export default routes;
