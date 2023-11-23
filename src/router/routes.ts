import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      {
        path: '/packages',
        component: () => import('pages/ListPage.vue'),
        props: (route) => ({
          query: decodeURIComponent(route.params.query as string),
        }),
      },
      {
        path: '/search/:query',
        component: () => import('pages/SearchPage.vue'),
        props: true,
      },
      {
        path: '/package/:name',
        component: () => import('pages/PackageInfo.vue'),
        props: (route) => ({
          name: decodeURIComponent(route.params.name as string),
        }),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
