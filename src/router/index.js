import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false});
NProgress.configure({easing: 'ease', speed: 500});

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    NProgress.set(0.25)
    // const hostname = window.location.host;
    next()
});

router.afterEach(() => {
    setTimeout(() => NProgress.done(), 250)
})

export default router
