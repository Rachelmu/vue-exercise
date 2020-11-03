<template>
	<form @submit.prevent="submit">
		<section class="content">
			<h2>{{ title }}</h2>
			<!-- Main content -->
			<slot />
			<div class="actions">
				<!-- Action buttons -->
				<slot name="actions" />
			</div>
			<div class="error" v-if="error">{{ error }}</div>
		</section>

		<transition name="fade">
			<!-- Expanding over the form -->
			<Loading v-if="busy" class="overlay" />
		</transition>
	</form>
</template>
<script>
export default{
	props: {
		title:{
			type: String,
			default: '',
			required: true
		},
		operation: {
			type: Function,
			required: true
		},
		valid: {
			type: Boolean,
			required: true
		}
	},
	data(){
		return{
			error: null,
			busy: false,
		}
	},
	methods:{
		async submit(){
			if(this.valid && !this.busy){
				this.error = null
				this.busy = true
				try{
					await this.operation()
				} catch (e){
					this.error = e.message
				}
				this.busy = false
			}
		}
	}
}
</script>
