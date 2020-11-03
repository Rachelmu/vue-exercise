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
	</form>
</template>