import { lazy } from 'react';
const Home = lazy(() => import('pages/home'));
const ErrorResult = lazy(() => import('pages/common/error/ErrorResult'));
const AppList = lazy(() => import('pages/app'));
const AppDetail = lazy(() => import('pages/app/components/Detail'));
const EvidenceList = lazy(() => import('pages/evidence'));
const EvidenceAdd = lazy(() => import('pages/evidence/components/Add'));
const EvidenceDetail = lazy(() => import('pages/evidence/components/Detail'));
const UserList = lazy(() => import('pages/user'));
const UserAdd = lazy(() => import('pages/user/components/Add'));
const FileList = lazy(() => import('pages/file'));
const FileAdd = lazy(() => import('pages/file/components/Add'));
const FileDetail = lazy(() => import('pages/file/components/Detail'));

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
    path: "/app/detail",
    component: AppDetail
  },
  {
    path: "/evidence/list",
    component: EvidenceList
  },
  {
    path: "/evidence/add",
    component: EvidenceAdd
  },
  {
    path: "/evidence/detail",
    component: EvidenceDetail
  },
  {
    path: "/user/add",
    component: UserAdd
  },
  {
    path: "/user/list",
    component: UserList
  },
  {
    path: "/file/list",
    component: FileList
  },
  {
    path: "/file/add",
    component: FileAdd
  },
  {
    path: "/file/detail",
    component: FileDetail
  },

];
export default routes;
