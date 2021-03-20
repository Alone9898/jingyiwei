<template>
	<view class="content">
		<view class="msg_item">
            
		</view>
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

<style lang="scss" scoped>
    .content{
        width: 100%;
        height: 100vh;
        background: #fafafa;
        padding: 0 15upx;
        box-sizing: border-box;
        .msg_item{
            width: 100%;
            height: 204upx;
            opacity: 1;
            background: #ffffff;
            border: 1px solid #f7f7f7;
            border-radius: 13upx;
            box-shadow: 0px 2upx 4upx 0px rgba(0,0,0,0.08); 
        }
    }
</style>
