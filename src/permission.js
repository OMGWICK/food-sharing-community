import router from './router'
import { getToken } from '@/utils/jsToken'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style


const whiteList = ['/login']  // when no token , don't have to jump anywhere

router.beforeEach((to,from,next) => {
    NProgress.start()
    const hasToken = getToken()
    if(hasToken){
        //has token
        if(to.path === '/login') {
            next( {path:'/'} )
            NProgress.done()
        }else {
            next()
        }
    }else {
        // no token
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        } else{
            next( {path:'/login'} )
            NProgress.done()
        }
    }
})

router.afterEach(()=>{
    NProgress.done()
})