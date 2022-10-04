
import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewerView from '../views/ViewerView.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ViewerView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
  name: 'viewer',
    path: '/viewer/:name/:n',
    component: ViewerView,
    // children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      // { path: '', component: UserHome },
      
      // UserProfile will be rendered inside User's <router-view>
      // when /user/:id/profile is matched
      // { path: 'id/:id_n', component: ViewerView }],
    beforeEnter: (to, from, next) => {
      store.dispatch('setContentType', 'info')
      store.dispatch('loadCase', {
        type: 'puzzles',
        // typeId: to.params.id,
        id: to.params.name
      })
      // store.dispatch('setPuzzleId', to.params.name)
      store.dispatch('loadSpecializations')
      store.dispatch('loadCaseResources')
      next()
    },
    beforeRouteUpdate(to, from, next) {
      ViewerView.OpenSeadragon({
        tileSources: `${to.params.name}.dzi`
      })
      setTimeout(() => {
        ViewerView.OpenSeadragon.Viewer.forceRedraw()
      }, '1000');
      // location.reload()
      // ViewerView.OpenSeadragon
      // обрабатываем изменение параметров маршрута...
      // не забываем вызвать next()
      next()
    }
  },
  // { path: '/viewer/:id/:name', component: ViewerView }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
