import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

router.map({
  '/': {
    component: require('../pages/Home'),
    public: true
  }
})

router.beforeEach(({from, to, next}) => {
  if (to.public) {
    return next()
  }

  // Redirect to login page if route is not public and user not logged in
  let returnUrl
  if (from.name === 'login') {
    returnUrl = from.query.returnUrl || to.path
  } else if (to.name === 'login') {
    returnUrl = to.query.returnUrl
  } else {
    returnUrl = to.path
  }
  console.log('returnUrl: ', returnUrl)
})

// Broadcast an event on route changed
router.afterEach(function ({to}) {
  let vm = to.router.app
  vm.$dispatch('onRouteChanged', to)
  vm.$broadcast('onRouteChanged', to)
})

export default router
