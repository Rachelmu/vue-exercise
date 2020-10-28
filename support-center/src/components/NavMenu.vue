<template>
	<nav class="menu">
		<!-- 链接在这里 -->
		<router-link :to="{name: 'home'}" exact> Home </router-link>
		<router-link :to="{name: 'faq'}"> FAQ </router-link>
	</nav>
</template>
<style lang="stylus" scoped>
@import '../style/imports';

.router-link-active {
	border-bottom-color: $primary-color;
}
</style>