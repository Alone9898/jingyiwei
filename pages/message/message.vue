<template>
    <view class="pt-15">
        <navBar :title="'锦医帷'"></navBar>
        <view class="content" :style="{paddingTop:globalData.navBarHeight+'px'}">
            <view class="msg_item text-black bg-white bb mb-30" v-for="item in msgList" @click="details(1)">
                <view class="flex fs align-center mb-20">
                    <view class=" text-bold">
                      运维日报
                    </view>
                    <view class="time">
                        {{item.time}}
                    </view>
                </view>
                <view class="mb-10">
                    通话{{item.value.exhale}}次 (来电{{item.value.exhale}}次, 呼出{{item.value.exhale}}次, 未接{{item.value.missed}}次)
                </view>
                <view class="mb-10">
                    创建工单{{item.value.create}}个
                </view>
                <view class="mb-10">
                   完成工单{{item.value.complete}}个
                </view>
                <view class="mb-20">
                   电话找人{{item.value.look}}次
                </view>
                <van-divider customStyle="margin: 0 0 15px 0;" />
                <view class="flex align-center space-between item mb-10 pl-10">
                    <text>今日总体情况</text>
                    <van-icon name="arrow" />
                </view>
            </view>
        </view>
        <tabbar></tabbar>
    </view>
</template>

<script>
    import tabbar from "@/components/tabar/tabar.vue"
    import navBar from "@/components/navBar/navBar.vue"
    import {
            axios
        } from '@/util/index.js'
    export default {
        data() {
            return {
                globalData: {},
                msgList:[]
            }
        },
        components: {
            tabbar,
            navBar
        },
        mounted() {
            this.globalData = uni.getStorageSync('globalData')
            this.list()
        },
        methods: {
            details(id){
                uni.navigateTo({
                    url: '../message/daily/daily?id='+id
                })
            },
            list(){
                let data={
                    pageNum:'1',
                    pageSize:'100'
                }
              axios({
                  url: '/ywt/busOrderStatistics/getOrderTotalList',
                  data: {
                      ...data
                  },
                  method: 'post'
              }).then(res => {
                  this.msgList=res.body.list
                  this.msgList.forEach(item=>{
                      item.value=JSON.parse(item.value)
                  })
              })
            },  
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        width: 100%;
        padding: 0 15px 100px 15px;
        box-sizing: border-box;
        .navBar {
            width: 100%;
            height: 54px;
            opacity: 0.9;
            font-size: 17px;
            text-align: center;
            color: #000000;
            line-height: 20px;
        }

        .msg_item {
            width: 100%;
            height: 250px;
            opacity: 1;
            border: 1px solid #f7f7f7;
            padding: 15px;
            border-radius: 13px;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
            .fs{
                font-size: 17px;
            }
            .time{
                margin-left: auto;
                font-size: 14px;
                font-weight: 400;
                color: #c0c4cc;
            }
            .item{
                font-size: 14px;
                color: #409eff;
            }
        }
    }
</style>
