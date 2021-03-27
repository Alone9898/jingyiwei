<template>
    <view class="content bg-white">
        <view class="flex justify-start tab_abc" style="margin-top: 0;">
            <view class="padding-sm active text-center">
                <text>登录</text>
                <view class="soild_ms"></view>
            </view>
        </view>
        <view class="padding" style="margin-top: 110upx;">
            <view>
                    <van-field border="false" maxlength='11' @input="account=$event.mp.detail" :value="account" center clearable label="手机号" placeholder="请输入手机号"
                        use-button-slot>
                        <!-- <van-button slot="button" @tap="bindSms" size="small" :style="btnStatus? 'color:#AAAAAA':''"
                            type="primary">
                            {{btnText}}
                        </van-button> -->
                    </van-field>
                    <view style="padding-top: 40upx;">
                    </view>
              <!--  <van-field center :value="code" @input="code=$event.mp.detail" clearable label="验证码" placeholder="请输入验证码"> -->
                </van-field :border="false">
                </van-cell-group>
                <!-- <view class="flex align-center" style="margin-top: 90upx;padding-left: 20upx;">
                    <van-checkbox v-model="checked" @change="checked=$event.detail" checked-color="#F99C50"></van-checkbox>
                    <text class="yesText">我已阅读并同意<text>《用户使用协议》</text></text>
                </view> -->
                <view class="bindLogin" @tap="bindLogin">登录</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {axios} from '@/util/index.js'
    export default {
        data() {
            return {
                isActive: 1,
                providerList: [],
                hasProvider: false,
                account: '15555555555',
                // account: '18222222222',
                checked:false,
                isDevtools: false,
                code: '',
                inviterMobile: '',
                btnText: "获取验证码",
                time: 60,
                btnStatus: false,
                clear: "",
                openid:'',
            }
        },
        methods: {
            // 登录 注册切换
            switchover(i) {
                this.isActive = i
            },
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                // if (this.account.length < 11) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '手机号最短为 11 个字符'
                //     });
                //     return;
                // }
                // if (this.code.length < 6) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '验证码最短为 6 个字符'
                //     });
                //     return;
                // }
                // if (!this.checked) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '请阅读并同意《用户使用手册》'
                //     });
                //     return;
                // }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                axios({
                    url: "/ywt/loginWeChat",
                    data: {
                        phoneNum: this.account,
                        // code: this.password,
                        // openid: this.openid,
                    }
                }).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        uni.showToast({
                            icon: "none",
                            title: '登录成功'
                        })
                        uni.setStorage({
                            key: 'userInfo',
                            data: res.body,
                            success: function(res) {
                                setTimeout(() => {
                                   uni.switchTab({
                                   		url: '/pages/user/user'
                                  });
                                }, 1000);
                            }
                        });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: res.msg
                        })
                    }
                })
            },
            onChange(event){
               this.checked=event.detail
            },
            bindSms() {
                this.btnStatus = true
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入手机号'
                    });
                    this.btnStatus = false
                    return;
                }
                axios({
                    url: "user/sms",
                     method: 'post',
                    data: {
                        phone: this.account,
                    }
                }).then(res => {
                    if (res.code === 200) {
                        uni.showToast({
                            icon: "none",
                            title: res.msg
                        })
                        this.time = 60;
                        this.btnText = this.time + "s后重新获取";
                        this.clear = setInterval(this.countDown, 1000);
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: res.msg
                        })
                        this.btnStatus = false
                    }
                })
            },
            countDown() {
                if (!this.time) {
                    this.btnStatus = false;
                    this.btnText = '获取验证码';
                    clearInterval(this.clear);
                } else {
                    --this.time;
                    this.btnText = this.time + "s后重新获取";
                }
            }
        },
        onReady() {
            this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
        },
        mounted() {
            uni.login({
              provider: 'weixin',
              success: function (res) {
                // this.openid=res.code;
              }
            });
        }
    }
</script>
<style lang="scss" scoped>
    .content {
        height: 100vh;
        padding: 80upx 60upx;
        box-sizing: border-box;
    }

    .tab_abc {
        margin-top: 50upx;

        view {
            font-size: 56upx;
            font-weight: 700;
            color: #333333;
        }

        .soild_ms {
            width: 122upx;
            height: 12upx;
            background: linear-gradient(#3875f6 0%, #ffffff 100%);
            margin: 10upx auto;
            border-radius: 3px;
        }

        .active {
            font-size: 46upx;
            font-weight: 700;
            color: #333333;
        }
    }

    .yesText {
        font-size: 28upx;
        font-weight: 400;
        color: #aaaaaa;
        letter-spacing: 2upx;
        margin-left: 20upx;
        text{
            color: #306AFF;
        }
    }

    .bindLogin {
        width: 100%;
        height: 90upx;
        background: #2e80fe;
        border-radius: 45upx;
        margin-top: 90upx;
        box-shadow: 0px 14px 16px 0px rgba(46, 128, 254, 0.42);
        font-size: 32upx;
        font-weight: 400;
        text-align: center;
        line-height: 90upx;
        color: #ffffff;
    }
</style>
