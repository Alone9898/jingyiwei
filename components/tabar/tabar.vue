<template>
	<view class="tabar_centent">
		<tabbar :active="active" active-color="#3875F6" inactive-color="#B2B2B2">
			<tabbarItem v-for="(item,i) in tabar" :key='i' @click="tab(item.id,item.path)">
				<image slot="icon" :src="item.normal" mode="aspectFit" class="tabar_img" />
				<image slot="icon-active" :src="item.active" mode="aspectFit" class="tabar_img" />
				{{item.name}}
			</tabbarItem>
		</tabbar>
	</view>
</template>

<script>
	import tabbar from "@/wxcomponents/vant/tabbar/index.js"
	import tabbarItem from "@/wxcomponents/vant/tabbar-item/index.js"
    import {
        mapState,
        mapMutations
    } from 'vuex'
	export default {
		data() {
			return {
				//
				active: 0,
				tabar: [{
						id: 0,
						normal: '/static/tabar/home_1.png',
						active: '/static/tabar/home.png',
						name: '发现',
						path: '../main/main',
					},
					{
						id: 1,
						normal: '/static/tabar/college.png',
						active: '/static/tabar/college_1.png',
						name: '众学院',
						path: '../main/main',
					},
					{
						id: 2,
						normal: '/static/tabar/measurement.png',
						active: '/static/tabar/measurement_1.png',
						name: '众测评',
						path: '../user/user',
					},
					{
						id: 3,
						normal: '/static/tabar/learning.png',
						active: '/static/tabar/learning_1.png',
						name: '学习中心',
						path: '../user/user',
					},
					{
						id: 4,
						normal: '/static/tabar/me_1.png',
						active: '/static/tabar/me.png',
						name: '我的',
						path: '../user/user',
					},
				]
			}
		},
		components: {
			tabbar,
			tabbarItem,
		},
        created() {
           this.active=this.$store.state.tabActive
        },
		methods: {
			//
			tab(e, path) {
                this.$store.commit('tabarActive',e)
				uni.reLaunch({
					url: path
				});
			},
		},
        mounted() {
        }
	}
</script>

<style lang="scss" scoped>
	.tabar_centent {
		.tabar_img {
			width: 60upx;
			height: 47upx;
		}
	}
</style>
<!-- 	"tabBar": {
		"color": "#B2B2B2",
		"selectedColor": "#3875F6",
		"backgroundColor": "#ffffff",
		"list": [{
			"pagePath": "pages/main/main",
			"text": "发现",
			"iconPath": "/static/tabar/home_1.png",
			"selectedIconPath": "/static/tabar/home.png"
		},{
			"pagePath": "pages/main/main",
			"text": "众学院",
			"iconPath": "/static/tabar/college.png",
			"selectedIconPath": "/static/tabar/college_1.png"
		},
	    {
	    	"pagePath": "pages/user/user",
	    	"text": "众测评",
	    	"iconPath": "/static/tabar/home_1.png",
	    	"selectedIconPath": "/static/tabar/home.png"
	    },{
	    	"pagePath": "pages/user/user",
	    	"text": "学习中心",
	    	"iconPath": "/static/tabar/learning.png",
	    	"selectedIconPath": "/static/tabar/learning_1.png"
	    },{
			"pagePath": "pages/user/user",
			"text": "我的",
			"iconPath": "/static/tabar/me_1.png",
			"selectedIconPath": "/static/tabar/me.png"
		}]
	}, -->
