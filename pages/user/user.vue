<template>
    <view class="content" style="background: #fff;width: 100%;height: 100%;position: absolute;top: 0px; bottom: 0px;">
        <view class="bg-img" style="height: 170rpx;">
            <view class="flex align-center">
                <van-image width="100rpx" height="100rpx" fit="cover" radius='4' src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <view class="xl round margin-left" :style="'background-image:url('+account.account_head_image+')'"></view>
                <view>
                    <view class="text-xl text-bold text-white flex align-center" style="padding-left: 20upx;">
                        <text v-if="loginStatus" style="color: #3F536E;">{{account.account_nickname}}</text>
                        <navigator v-if="!loginStatus" url="../login/login" hover-class="none">
                            <text style="color:#000">登录/注册</text>
                        </navigator>
                        <text class="member" v-if="loginStatus">
                            {{}}
                        </text>
                    </view>
                </view>
                <view class="setting" v-if="loginStatus">
                    <view @click="setting()"></view>
                    <text>本月工单处理</text>
                </view>
            </view>
        </view>
        <view class="preview">
            <view class="flex flex-wrap" style="justify-content: space-around;">
                <view>
                    <view class="imgBox" @click="skip(0)">
                        <image src="../../static/img/orders.png" mode="aspectFill"></image>
                    </view>
                    <view class="text-dec">
                        接单中心
                    </view>
                </view>
                <view>
                    <view class="imgBox" @click="skip(1)">
                        <image src="../../static/img/myorder.png" mode="aspectFill"></image>
                    </view>
                    <view class="text-dec">
                        我的工单
                    </view>
                </view>
                <view>
                    <view class="imgBox" @click="skip(2)">
                        <image src="../../static/img/reorder.png" mode="aspectFill"></image>
                    </view>
                    <view class="text-dec">
                        工单审核
                    </view>
                </view>
            </view>
           <!-- <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号</button> -->
        </view>
        <van-dialog use-slot title="本月工单处理" :show="orderChartShow" :show-cancel-button='false' :show-confirm-button='false'
            :close-on-click-overlay='true' @close="onClose">
            <div style="width: 600rpx;height: 400rpx;margin: 40rpx auto">
                <pie-chart :dataAs="pieData" canvasId="index_pie_1" :width="580" :height="420" />
            </div>
        </van-dialog>
        <tabbar></tabbar>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import {axios} from '@/util/index.js'
    import tabbar from "@/components/tabar/tabar.vue"
    import PieChart from '@/components/stan-ucharts/PieChart.vue'
    import WXBizDataCrypt from "@/config/WXBizDataCrypt.js";
    export default {
        data() {
            return {
                loginStatus: false,
                account: {
                    account_nickname: 'XXX',
                    account_head_image: '',
                },
                orderChartShow: false,
                listPageConfig: {
                    0: 'recOrder',
                    1: 'myOrder',
                    2: 'revOrder'
                },
                pieData: {
                    //饼状图数据
                    series: [{
                            name: '待审核',
                            data: 50
                        },
                        {
                            name: '已完成',
                            data: 20
                        },
                        {
                            name: '处理中',
                            data: 18
                        },
                        {
                            name: '暂停处理',
                            data: 1
                        },
                        {
                            name: '待评价',
                            data: 8
                        }
                    ]
                }
            };
        },
        components: {
            tabbar,
            PieChart
        },
        onReady() {
            axios({
                url: '/ywt/outer/getEditionList?dicList=dic,unit,user',
                method: 'post'
            }).then(res => {
                uni.setStorage({
                    key: 'Edition',
                    data: res.body,
                })
            })
            var context = uni.createCanvasContext('firstCanvas')
            context.setStrokeStyle("#ff0000")
            context.setLineWidth(2)
            context.moveTo(160, 100)
            context.arc(100, 100, 60, 0, 2 * Math.PI, true)
            context.moveTo(140, 100)
            context.arc(100, 100, 40, 0, Math.PI, false)
            context.moveTo(85, 80)
            context.arc(80, 80, 5, 0, 2 * Math.PI, true)
            context.moveTo(125, 80)
            context.arc(120, 80, 5, 0, 2 * Math.PI, true)
            context.stroke()
            context.draw()
        },
        onShow() {
            let userInfo = uni.getStorageSync('userInfo')
            if (userInfo.token) {
                this.loginStatus = true
                this.account.account_nickname=userInfo.depts[0].name
            }
        },
        onload() {
            this.getAccountInfo()
            wx.login({
                success: (res) => {
                    if (res.code) { //微信登录成功 已拿到code  
                        // uni.request({  
                        //     url: 'https://www.xx123.com//common/unionId.do',        //演示地址，请以你的后端接口为准  
                        //     method:'POST',  
                        //     data: {  
                        //         code: res.code              //wx.login 登录成功后的code  
                        //     },  
                        //     success: (cts) => {  
                        //         // 换取成功后 暂存这些数据 留作后续操作  
                        //         this.openid=cts.data.openid     //openid 用户唯一标识  
                        //         this.unionid=cts.data.unionid     //unionid 开放平台唯一标识  
                        //         this.session_key=cts.data.session_key     //session_key  会话密钥  
                        //     }  
                        // });  
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        methods: {
            onGetPhoneNumber(e) {
                if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
                    //拒绝授权后弹出一些提示  
                } else { //允许授权  
                    console.log(e.detail.encryptedData)
                    e.detail.encryptedData //加密的用户信息  
                    e.detail.iv //加密算法的初始向量  时要用到  
                    let appId = 'wx4f4bc4dec97d474b'
                    let sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
                    if (e.detail.errMsg == "getPhoneNumber:ok") {
                        let pc = new WXBizDataCrypt(appId, sessionKey); //wxXXXXXXX为你的小程序APPID  
                        let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
                        console.log(data)
                    } else {
                        console.log("用户点击了拒绝")
                    }
                }
            },
            onClose() {
                this.orderChartShow = false;
            },
            setting() {
                this.orderChartShow = true;
                if (!this.loginStatus) {
                    uni.navigateTo({
                        url: "../login/login"
                    })
                } else {
                    uni.navigateTo({
                        url: '/userClass/setting'
                    })
                }
            },
            getAccountInfo() {
                axios({
                    url: "/ywt/loginWeChat",
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
                        url: '../order/index?type=' + this.listPageConfig[i] + '&typeIndex=' + (i+1)
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
        padding-top: 180upx;
        padding-left: 36upx;
        padding-right: 36upx;
    }

    .setting {
        height: 110rpx;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-size: 20rpx;

        &>view {
            background-image: url(../../static/img/chart.png);
            background-size: cover;
            width: 80rpx;
            height: 80rpx;
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

    .text-xl {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
                    height: 50rpx;
                    line-height: 50rpx;

                    image {
                        height: 50rpx;
                        width: 50rpx;
                    }
                }

                .text-dec {
                    font-size: 26rpx;
                    margin-top: 10rpx;
                    font-weight: 400;
                    color: #333333;
                }
            }
        }
    }
</style>
