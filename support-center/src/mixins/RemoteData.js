export default function (resources){
	return{
		data(){
			let initData = {
				remoteDataLoading: 0,
			}

			// 初始化数据属性
			for (const key in resources){
				initData[key] = null
			}
			return initData
		},
		created(){
			for(const key in resources){
				let url = resources[key]
				this.fetchResource(key, url)
			}
		},
		methods: {
			async fetchResource(key, url){
				try{
					this.$data[key] = await this.$fetch(url)
				} catch(e){
					console.error(e)
				}
			}
		}
	}
}