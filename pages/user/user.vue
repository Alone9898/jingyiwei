<template>
    <view class="content" style="background: #fff;width: 100%;height: 100%;position: absolute;top: 0px; bottom: 0px;">
        <view class="bg-img" style="height: 170rpx;">
            <view class="flex align-center">
                <van-image width="100rpx" height="100rpx" fit="cover" radius='4' src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <view class="xl round margin-left" :style="'background-image:url('+account.account_head_image+')'"></view>
                <view>
                    <view class="text-xl text-bold text-white flex align-center" style="padding-left: 20upx;">
                        <text v-if="loginStatus" style="color: #3F536E;">{{account.account_nickname}}</text>
                        <navigator v-else url="../login/login" hover-class="none">
                            <text>登录/注册</text>
                        </navigator>
                        <text class="member">
                            部门：信息部
                        </text>
                    </view>
                </view>
                <view class="setting">
                    <view @click="setting()"></view>
                    <text>本月工单处理</text>
                </view>
            </view>
        </view>
        <view class="preview">
            <view class="flex flex-wrap" style="justify-content: space-around;">
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/measurement.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        接单中心
                    </view>
                </view>
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/service.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        我的工单
                    </view>
                </view>
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/reading.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        工单审核
                    </view>
                </view>
            </view>
        </view>
        <tabbar></tabbar>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
     import tabbar from "@/components/tabar/tabar.vue"
    export default {
        data() {
            return {
                loginStatus: false,
                account: {
                    account_nickname: 'XXX',
                    account_head_image: '',
                }
            };
        },
        components: {
            tabbar
        },
        onLoad() {

        },
        onShow() {
            let token = getApp().globalData.token
            if (token !== "") {
                this.loginStatus = true
                this.getAccountInfo()
            }
        },
        methods: {
            setting() {
				console.log(222)
                if (!this.loginStatus) {
                    uni.navigateTo({
                        url: "../login/login"
                    })
                } else {
                    uni.navigateTo({
                        url: 'userClass/setting'
                    })
                }
            },
            getAccountInfo() {
                this.axios({
                    url: "account",
                    header: {
                        token: getApp().globalData.token
                    }
                }).then(res => {
                    if (res.code === 200) {
                        this.account = res.data.account
                    }
                })
            },
            skip(i) {
                if (!this.loginStatus) {
                    uni.navigateTo({
                        url: "../login/login"
                    })
                } else {
                    uni.navigateTo({
                        url: '../userClass/order?tep=' + i
                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .menu-list {
        image {
            width: 100%;
        }
    }

    .bg-img {
        height: 340upx;
        padding-top: 120upx;
        padding-left: 36upx;
        padding-right: 36upx;
    }

    .setting {
        height: 60upx;
        margin-left: auto;

        &>view {
            background-image: url(../../static/img/chart.png);
            background-size: cover;
            width: 60upx;
            height: 60upx;
        }
    }

    .member {
        height: 40upx;
        background-size: 100% 100%;
        font-weight: 400;
        font-size: 24upx;
        text-align: right;
        box-sizing: border-box;
        line-height: 40upx;
        color: rgb(155, 155, 155);
    }
	.text-xl{
		display: flex;
        flex-direction: column;
        align-items: flex-start;
	}

    .countNum {
        padding-top: 40upx;

        .flex-sub {
            view {
                font-size: 28upx;
                font-weight: 400;
                text-align: center;
                color: #ffffff;
            }

            &>view:nth-child(2) {
                margin-top: 24upx;
                font-weight: 700;
            }
        }
    }

    .preview {
        height: 160upx;
        margin: -27upx 30upx 20upx 30upx;
        border-radius: 14rpx;
        background: #ffffff;
        box-sizing: border-box;
		box-shadow: 0px 0px 10px 0px #9c9c9c;
        image {
            width: 40upx;
            height: 40upx;
        }	

        .flex {
            &>view {
                width: 25%;
                margin-top: 40upx;
                text-align: center;

                .imgBox {
                    height: 40upx;
                    line-height: 40upx;
                }

                .text-dec {
                    font-size: 26upx;
                    margin-top: 30upx;
                    font-weight: 400;
                    color: #333333;
                }
            }
        }

        ;
    }

    .cu-list {
        padding: 0 30upx;
        border-radius: 14upx;
        margin-bottom: 130upx;
        box-shadow: 0px 1px 35upx 0px #eaeaea;

        .cu-list-text {
            margin-left: 33upx;
            font-size: 28upx;
            font-weight: 400;
            color: #333333;
        }
    }

    .cu-list.menu>.cu-item .content>image {
        width: 30upx;
        height: 30upx;
    }

    .cu-list.menu>.cu-item .content>.text-grey {
        font-size: 28upx;
        font-weight: 400;
        color: #333333;
        margin-left: 35upx;
    }
</style>
