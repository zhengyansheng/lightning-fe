import Vue from 'vue';
import Router from 'vue-router';

const originalReplace = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(Router);

const routerConfig = {
    mode: 'history',
    routes: [
        ...(r => {
            const routeParams = [];
            r.keys().forEach(key => {
                if (r(key).default instanceof Array) {
                    r(key).default.forEach(val => {
                        routeParams.push(val);
                    })
                } else {
                    routeParams.push(r(key).default);
                }
            })
            return routeParams;
        })(require.context('./views/', true, /\/route\.js$/))
    ]
}

export function resetRouter() {
    const newRouter = new Router(routerConfig)
    router.matcher = newRouter.matcher // reset router
}

export default new Router(routerConfig)