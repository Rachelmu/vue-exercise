<template>
	<main class="faq">
		<h1>Frenquently Asked Questions</h1>
		<div class="error" v-if="error">
			Can't load the questions
		</div>
		<section class="list">
			<article v-for="question of question" :key="question">
				<h2 v-html="question.title"></h2>
				<p v-html="question.content"></p>
			</article>
		</section>
		<Loading v-if="loading" />
	</main>
</template>
<script>
export default{
	data(){
		return{
			questions: [],
			error: null,
			loading: false
		}
	},
	// created(){
	// 	fetch('http://localhost:3000/questions').then(response => {
	// 		if (response.ok) {
	// 			return response.json()
	// 		}else {
	// 			return Promise.reject('error')
	// 		}
	// 	}).then(result => {
	// 		this.question = result
	// 	}).catch(e => {
	// 		this.error = e
	// 	})
	// }
	async created(){
		this.loading = true
		// try{
		// 	const response = await fetch('http://localhost:3000/question')
		// 	if (response.ok) {
		// 		this.questions = await response.json()
		// 	}else {
		// 		throw new Error('error')
		// 	}
		// } catch (e){
		// 	this.error = e
		// }
		// this.loading = false
		try {
			this.questions = await this.$fetch('question')
		}
		catch(e){
			this.error = e
		}
		this.loading = false
	}
}
</script>