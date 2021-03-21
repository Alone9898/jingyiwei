<template>
    <view class="nav bg-white" :style="{height:globalData.navBarHeight+'px'}">
        <!-- 胶囊区域 -->
        <view class="capsule-box" :style="{height:globalData.menuHeight+'px',minHeight:globalData.menuHeight+'px',lineHeight:globalData.menuHeight+'px',top:globalData.topHeight+'px'}">
            <!--    <view class="nav-handle">
              <image class="nav-back-icon" src="/images/nav_back.png" @click="navToBackLastPage"></image>
              <image class="nav-home-icon" src="/images/nav_home.png" @click="navToHomePage"></image>
            </view> -->
            <view class="nav-title">{{title}}</view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                globalData: {
                    //全局数据管理
                    navBarHeight: 0, // 导航栏高度
                    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
                    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
                    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
                    topHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
                }
            };
        },
        props: {
            title: ''
        },
        methods: {
            /**
             * @description 设置导航栏信息
             */
            setNavBarInfo() {
                // 获取系统信息
                const systemInfo = wx.getSystemInfoSync();
                // 胶囊按钮位置信息
                const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
                this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
                // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
                this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight +this.globalData.menuBotton;
                this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
                this.globalData.menuHeight = menuButtonInfo.height;
                this.globalData.topHeight =  this.globalData.navBarHeight -  this.globalData.menuHeight-this.globalData.menuBotton;;
                uni.setStorage({
                    key: 'globalData',
                    data: this.globalData,
                    success: function() {
                    }
                });
            },
            navToBackLastPage() {

            },
            navToHomePage() {

            }
        },
        mounted() {
            this.setNavBarInfo()
        }
    }
</script>

<style lang="scss" scoped>
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height:var(--status-bar-height);
        .nav-main {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .capsule-box {
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            position: relative;
        }

        .nav-title {
            text-align: center;
            font-size: 14px;
            color: #000000;
        }
    }
</style>
