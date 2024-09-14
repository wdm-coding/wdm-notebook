import { createRouter,createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('../../src/index.md'),
  },
	{
    path: '/pages/Vue3/api',
    component: () => import('../../src/pages/Vue3/api.md'),
  }	
]
const router = createRouter({
	history: createWebHashHistory('/wdm-notebook/'),
	routes
})
export default router