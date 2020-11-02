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
		}
	}
}