<template>
    <view class="content" style="background: #f2f2f2;width: 100%;height: 100%;position: absolute;top: 0px; bottom: 0px;">
        <view class="bg-img" style="background-image: url(../../static/img/me_bg.png);">
            <view class="flex align-center">
                <van-image width="100rpx" height="100rpx" fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <view class="xl round margin-left" :style="'background-image:url('+account.account_head_image+')'"></view>
                <view>
                    <view class="text-xl text-bold text-white flex align-center" style="padding-left: 20upx;height: 60upx;">
                        <text v-if="loginStatus">{{account.account_nickname}}</text>
                        <navigator v-else url="../login/login" hover-class="none">
                            <text>登录/注册</text>
                        </navigator>
                        <view class="member">
                            VIP7
                        </view>
                    </view>
                </view>
                <view class="setting">
                    <view @click="setting()"></view>
                </view>
            </view>
            <view class="flex countNum">
                <view class="flex-sub">
                    <view>2586</view>
                    <view>奖金</view>
                </view>
                <view class="flex-sub">
                    <view>8786</view>
                    <view>积分</view>
                </view>
                <view class="flex-sub">
                    <view>56</view>
                    <view>关注</view>
                </view>
                <view class="flex-sub">
                    <view>256</view>
                    <view>点赞</view>
                </view>
            </view>
        </view>
        <view class="preview">
            <view class="flex flex-wrap">
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/measurement.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        我的测评
                    </view>
                </view>
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/service.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        我的沟通
                    </view>
                </view>
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/reading.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        我的阅读
                    </view>
                </view>
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/complaints.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        课程订单
                    </view>
                </view>
                <view>
                    <view class="imgBox">
                        <image src="../../static/img/mall.png" mode="aspectFill" @click="skip(0)"></image>
                    </view>
                    <view class="text-dec">
                        商城订单
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-list padding-sm">
            <van-cell is-link link-type="navigateTo" url="/pages/dashboard/index">
                <view slot="title">
                    <view class="van-cell-text flex align-center">
                        <van-icon name="/static/img/course.png" size="33rpx" />
                        <text class="cu-list-text">课程赠送</text>
                    </view>
                </view>
            </van-cell>
            <van-cell is-link link-type="navigateTo" url="/pages/dashboard/index">
                <view slot="title">
                    <view class="van-cell-text flex align-center">
                        <van-icon name="/static/img/star.png" size="33rpx" />
                        <text class="cu-list-text">我的收藏</text>
                    </view>
                </view>
            </van-cell>
            <van-cell is-link link-type="navigateTo" url="/pages/dashboard/index">
                <view slot="title">
                    <view class="van-cell-text flex align-center">
                        <van-icon name="/static/img/card.png" size="33rpx" />
                        <text class="cu-list-text">流量历史</text>
                    </view>
                </view>
            </van-cell>
            <van-cell is-link link-type="navigateTo" url="/pages/dashboard/index">
                <view slot="title">
                    <view class="van-cell-text flex align-center">
                        <van-icon name="/static/img/star.png" size="33rpx" />
                        <text class="cu-list-text">我的下载</text>
                    </view>
                </view>
            </van-cell>
            <van-cell is-link link-type="navigateTo" url="/pages/dashboard/index">
                <view slot="title">
                    <view class="van-cell-text flex align-center">
                        <van-icon name="/static/img/Spellgroup.png" size="33rpx" />
                        <text class="cu-list-text">我的拼团</text>
                    </view>
                </view>
            </van-cell>
            <van-cell is-link link-type="navigateTo" :url="loginStatus?'userClass/complaint':'../login/login'">
                <view slot="title">
                    <view class="van-cell-text flex align-center">
                        <van-icon name="/static/img/vouchers.png" size="33rpx" />
                        <text class="cu-list-text">优惠券</text>
                    </view>
                </view>
            </van-cell>
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
                    account_nickname: '雷老板',
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
        height: 40upx;
        margin-left: auto;

        &>view {
            background-image: url(../../static/img/Setupthe.png);
            background-size: cover;
            width: 40upx;
            height: 40upx;
        }
    }

    .member {
        width: 125upx;
        height: 40upx;
        margin-left: 10upx;
        background-image: url(../../static/img/members.png);
        background-size: 100% 100%;
        font-weight: 400;
        font-size: 24upx;
        text-align: right;
        box-sizing: border-box;
        line-height: 40upx;
        padding-left: 30upx;
        text-align: center;
        color: #f1d087;
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
        height: 320upx;
        margin: -27upx 30upx 20upx 30upx;
        border-radius: 14rpx;
        background: #ffffff;
        box-sizing: border-box;

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
