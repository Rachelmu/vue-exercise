export default{
	install(Vue, options){
		// 插件选项
		let baseUrl = options.baseUrl
		console.log(baseUrl, )
		Vue.prototype.$fetch = fetch
	}
}