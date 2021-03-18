<template>
	<view class="content">
		<view class="headBox">
			<view class="search">
				<van-search shape="round" placeholder="请输入课程" use-action-slot>
					<view slot="action">
						<van-icon info="9" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="25px" style='vertical-align: middle' />
					</view>
				</van-search>
			</view>
			<view class="swiperBox mb-20">
				<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
					<block v-for="(item,index) in swiperList" :key="index">
						<swiper-item>
							<image style="width: 100%" :src="item.url" mode="aspectFit"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="bg-white padding-sm bodyBox">
			<view class="item1 bg-white flex text-center">
				<view class="flex-sub">
					<image src="../../static/img/home1.png" mode="widthFix"></image>
					<view class="">
						每日福利
					</view>
				</view>
				<view class="flex-sub">
					<image src="../../static/img/home2.png" mode="widthFix"></image>
					<view class="">
						精选文章
					</view>
				</view>
				<view class="flex-sub">
					<image src="../../static/img/home3.png" mode="widthFix"></image>
					<view class="">
						研习社
					</view>
				</view>
				<view class="flex-sub">
					<image src="../../static/img/home4.png" mode="widthFix"></image>
					<view class="">
						心理沟通
					</view>
				</view>
				<view class="flex-sub">
					<image src="../../static/img/home5.png" mode="widthFix"></image>
					<view class="">
						众商城
					</view>
				</view>
			</view>
			<text class="text-bold text-xl text-black">今日推荐</text>
			<view class="item4">
				<view class="flex align-center">
					<view class="dayRecommended" v-for="(item,index) in swiperList" mode="widthFix" :key="index">
						<image :src="item.url"></image>
						<view class="dec">
							托福老师在线发音指导
						</view>
						<view class="time">
							开课时间：12.20-12.31
						</view>
					</view>
				</view>
			</view>
			<text class="text-bold text-xl text-black">心理导师</text>
			<view class="item5">
				<view class="flex padding-sm" v-for="item in 3" :key="index">
					<view class="imgBox">
						<van-image width="90upx" height="90upx" round fit="fill" :src="account.account_head_image" />
					</view>
					<view class="contentBox">
						<view class="flex">
							<view class="name">
								李俊超
							</view>
							<view class="sign">
								空闲
							</view>
						</view>
						<view class="dec">
							生命有很多节点值得我们期待
						</view>
					</view>
					<view class="btbBox">
						<view class="bgText">
							向他倾诉
						</view>
						<view class="text">
							165人倾诉过
						</view>
					</view>
				</view>
			</view>
			<text class="text-bold text-xl text-black">导师介绍</text>
			<view class="item6">
				<view v-for="item in 6" :key="index" class="mb-40">
					<image src="../../static/img/promote.png" mode="widthFix"></image>
					<view class="flex">
						<view class="describe">
							全网独家绝密资料 押题命中率Max
						</view>
						<view class="name">
							李俊超
						</view>
					</view>
				</view>
			</view>
			<text class="text-bold text-xl text-black">精品课程</text>
			<view class="item7 flex">
				<view class="item mb-20" v-for="item in 7" :key="index">
					<image src="../../static/img/promote.png" mode="scaleToFill"></image>
					<view class="dec">
						托福老师在线发音指导
					</view>
					<view class="flex">
						<view class="textBox">
							<text>￥</text>
							<text style="font-size: 30upx;">28888</text>
						</view>
						<view class="deLine">
							300000
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	  import tabbar from "@/components/tabar/tabar.vue"
	export default {
		data() {
			return {
				active: 'home',
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://v.bootstrapmb.com/2018/10/wem0h2528/images/slide-1.jpg'
				}, {
					id: 2,
					type: 'image',
					url: 'http://v.bootstrapmb.com/2018/5/i95195/images/slide1.jpeg'
				}, {
					id: 3,
					type: 'image',
					url: 'http://v.bootstrapmb.com/2018/10/wem0h2528/images/slide-1.jpg'
				}],
				avatar: [
					'../../static/img/bill.png',
					'../../static/img/collection.png',
					'../../static/img/credit.png',
				],
			}
		},
		components: {
			 tabbar
		},
		methods: {
			inform() {
				uni.navigateTo({
					url: './mainClass/inform'
				})
			},
			skip(e) {
				uni.navigateTo({
					url: '../webView/webView?url=' + e
				})
			},
			onChange() {

			}
		}
	}
</script>

<style>
</style>
<style lang="scss" scoped>
	.content {
		background-color: $uni-bg-color;
	}

	.headBox {
		.search {
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			padding: 0 16upx;
		}

		.swiperBox {
			width: 100%;
		}
	}

	.bodyBox {
		background: inherit;
		padding-top: 0;

		.item1 {
			width: 100%;
			padding: 30upx 0;
			border-radius: 10upx;
			margin: 20upx 0;

			.flex-sub {
				image {
					width: 110upx;
				}
			}

			margin-bottom: 20upx;
		}

		.item4 {
			margin-left: 20;
			background: #ffffff;
			border-radius: 10upx;
			margin: 20upx 0;

			.flex {
				width: 100%;
				overflow-x: scroll;
				white-space: nowrap;
			}

			.dayRecommended {
				width: 300upx;
				opacity: 1;
				border-radius: 12upx;
				margin-right: 18upx;
				margin: 20upx 0;
				padding: 10upx 0 10upx 20upx;

				image {
					width: 100%;
					height: 180upx;
				}

				.dec {
					opacity: 1;
					font-size: 28upx;
					font-weight: 400;
					color: #333333;
					margin: 10upx 0;
				}

				.time {
					font-size: 24upx;
					font-weight: 400;
					color: #aaaaaa;
				}
			}
		}

		.item5 {
			width: 100%;
			background: #ffffff;
			border-radius: 10upx;
			margin: 20upx 0;

			&>.flex {
				padding-top: 30upx;
				padding-bottom: 26upx;
			}

			.imgBox {
				width: 90upx;
				height: 90upx;
				margin-right: 26upx;

				.cu-avatar {
					width: 90upx;
					height: 90upx;
				}
			}

			.contentBox {
				.name {
					height: 32upx;
					font-size: 28upx;
					font-weight: 400;
					color: #333333;
					line-height: 32upx;
					margin-top: 15upx;
				}

				.sign {
					width: 80upx;
					margin-top: 15upx;
					height: 32upx;
					margin-left: 16upx;
					background: #ffecc3;
					border-radius: 5upx;
					font-size: 24upx;
					font-weight: 400;
					text-align: center;
					color: #e8ae5e;
					line-height: 32upx;
				}

				.dec {
					width: 336upx;
					height: 25upx;
					font-size: 26upx;
					font-weight: 400;
					padding-top: 23upx;
					color: #aaaaaa;
					line-height: 25upx;
				}
			}

			.btbBox {
				width: 154upx;
				margin-left: auto;

				.bgText {
					text-align: center;
					height: 56upx;
					font-size: 26upx;
					font-weight: 400;
					line-height: 56upx;
					color: #ffffff;
					line-height: 29px;
					background-image: url(../../static/img/icon.png);
					background-size: 100% 100%;
					font-weight: 400;
				}

				.text {
					padding-top: 15upx;
					font-size: 22upx;
					font-weight: 400;
					text-align: center;
					color: #aaaaaa;
				}
			}
		}

		.item6 {
			width: 100%;
			background: #ffffff;
			border-radius: 10upx;
			margin: 20upx 0;
			padding: 0 20upx;
			box-sizing: border-box;

			image {
				width: 100%;
			}

			.flex {
				padding-top: 27upx;

				.describe {
					width: 423upx;
					height: 40upx;
					font-size: 28upx;
					font-weight: 400;
					color: #333333;
					line-height: 40upx;
				}

				.name {
					margin-left: auto;
					width: 77upx;
					height: 40upx;
					font-size: 26upx;
					font-weight: 400;
					text-align: center;
					color: #aaaaaa;
					line-height: 40upx;
				}
			}

		}

		.item7 {
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 20upx 0;

			.item {
				width: 349upx;
				height: 324upx;
				background: #ffffff;
				border-radius: 12pux;

				image {
					width: 100%;
					height: 200upx;
					opacity: 1;
					background: #eeeeee;
					border-radius: 12upx 12upx 0 0;
				}

				.dec {
					width: 278upx;
					height: 30upx;
					font-size: 27upx;
					font-weight: 400;
					text-align: left;
					margin: 20upx 20upx 0 20upx;
					color: #333333;
					line-height: 30upx;
				}

				.textBox {
					width: 123upx;
					height: 45upx;
					margin-top: 10upx;
					margin-left: 20upx;
					font-size: 24upx;
					font-weight: 400;
					text-align: left;
					color: #ff8c2e;
					line-height: 45upx;
				}

				.deLine {
					width: 81upx;
					opacity: 1;
					height: 45upx;
					font-size: 24upx;
					font-weight: 400;
					text-decoration: line-through;
					color: #cacaca;
					line-height: 45upx;
					margin-top: 10upx;
					margin-left: 20upx;
				}
			}
		}
	}
</style>
