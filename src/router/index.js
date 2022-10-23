import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },        
      {
        path: 'cipta-tugasan',
        component: () => import('@/views/CiptaTugasanPage.vue')
      },
      {
        path: 'tugasan/:id',
        name: 'satu-tugasan',
        component: () => import('@/views/TugasanPage.vue')
      },   
      {
        path: 'rosak',
        component: () => import('@/views/RosakPage.vue')
      },            
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'profil',
        component: () => import('@/views/ProfilPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },  
 
]

// router.beforeEach((to, from, next) => {
//   if (!useUserStore.isAuthenticated) next({ name: 'Login' })
//   else next()
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
