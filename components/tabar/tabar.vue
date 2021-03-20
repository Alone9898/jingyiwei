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
				active: 2,
				tabar: [{
						id: 0,
						normal: '/static/tabar/msg_normal.png',
						active: '/static/tabar/msg_active.png',
						name: '消息',
						path: '../message/message',
					},
					{
						id: 1,
						normal: '/static/tabar/home_normal.png',
						active: '/static/tabar/home_active.png',
						name: '首页',
						path: '../home/home',
					},
					{
						id: 2,
						normal: '/static/tabar/user_normal.png',
						active: '/static/tabar/user_active.png',
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
                if(this.active!==e){
                  this.$store.commit('tabarActive',e)
                  uni.reLaunch({
                      url: path
                  })  
                }
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