import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Edgar Jugado - Software Developer' }
    },
    {
      path: '/projects',
      name: 'all-projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: { title: 'All Projects | Edgar Jugado' }
    },
    {
      path: '/recommendations',
      name: 'all-recommendations',
      component: () => import('@/views/RecommendationsView.vue'),
      meta: { title: 'Recommendations | Edgar Jugado' }
    },
    {
          path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: '404 | Not Found' } 
    },
  
  ],
})


router.beforeEach((to, from, next) => {
  const defaultTitle = 'Edgar Jugado - Software Developer'
  document.title = to.meta?.title ? String(to.meta.title) : defaultTitle
  next()
})

export default router