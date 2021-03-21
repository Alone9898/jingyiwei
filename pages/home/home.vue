<template>
	<view>
       <navBar :title="'锦医帷'"></navBar>  
		<text>home</text>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import tabbar from "@/components/tabar/tabar.vue"
	export default {
		components: {
			 tabbar
		},
	}
</script>

<style>
</style>
