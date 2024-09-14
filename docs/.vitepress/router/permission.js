export default {
	install: (app, { router }) => {
		router.beforeEach(async (to, from, next) => {
			console.log("路由守卫", to);
			next()
		})
		router.afterEach(() => {
			NProgress.done()
		})
	}
}
