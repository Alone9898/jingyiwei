<template>
    <view>
        <view class="title bb">
            <text>{{time}}</text>
            <text class="ml-15">运维日报</text>
        </view>
        <view class="content">
            <view class="align-center flex pageItem space-between">
                <view class="upPage flex align-center " @click="UPday">
                    <van-icon name="arrow-left" />
                    前一天
                </view>
                <view>
                    <text>{{time}}</text>
                    <text class="ml-15">运维日报</text>
                </view>
                <view class="downPage flex align-center" @click="downDay">
                    后一天
                    <van-icon name="arrow" />
                </view>
            </view>
            <view class="situation mb-15">
                <view class="item1 mb-10">
                    值班服务台
                </view>
                <view class="flex align-center space-between item2 mb-10 pl-10">
                    <text>今日总体情况</text>
                    <van-icon name="arrow-down" />
                </view>
                <van-divider customStyle="margin: 0 0 10px 0;" />
                <view class="flex align-center item3 space-between mb-10">
                    <view class="circle">
                        <van-circle value="30" size="64" layer-color="#E6E6E6" color="#A46DFF" text="20%" />
                        <view>电话接听率</view>
                    </view>
                    <view class="circle">
                        <van-circle value="30" size="64" layer-color="#E6E6E6" color="#DB5654" text="10%" />
                        <view>工单完成率</view>
                    </view>
                    <view class="circle">
                        <van-circle value="30" size="64" layer-color="#E6E6E6" color="#45994E" text="40%" />
                        <view>服务台解决率</view>
                    </view>
                </view>
            </view>
            <view class="situation module mb-15">
                <view class="pt-10 mb-10 flex align-center bb">
                    <view class="line">
                    </view>
                    <view class="textTitlw">
                        通话: {{tableList.complete}}次
                    </view>
                </view>
                <view class="flex align-center pl-10 pb-10">
                    <view class="mode pr-35">
                        已接: {{tableList.accept}}
                    </view>
                    <view class="mode pr-35">
                        未接: {{tableList.missed}}
                    </view>
                    <view class="mode">
                        呼出: {{tableList.exhale}}
                    </view>
                </view>
            </view>
            <view class="situation module mb-15">
                <view class="pt-10 mb-10 flex align-center bb">
                    <view class="line">
                    </view>
                    <view class="textTitlw">
                        已接: {{tableList.accept}}次
                    </view>
                </view>
                <view class="flex align-center pl-10 pr-10 pb-10 flex-wrap">
                    <view class="mode pr-35">
                        建单: {{tableList.create}}
                    </view>
                    <view class="mode pr-35">
                        关联: {{tableList.create}}
                    </view>
                    <view class="mode pr-35">
                        找人: {{tableList.look}}
                    </view>
                    <view class="mode pr-35 mt-5">
                        无效: {{tableList.invalid}}
                    </view>
                    <view class="mode pr-35 mt-5">
                        未操作: {{tableList.none}}
                    </view>
                    <view class="mode pr-35 mt-5">
                        
                    </view>
                </view>
            </view>
            <view class="situation module mb-15">
                <view class="pt-10 mb-10 flex align-center">
                    <view class="line">
                    </view>
                    <view class="textTitlw">
                        工单: 0个
                    </view>
                </view>
                <view class="flex align-center pl-10 pr-10 space-between pb-10">
                    <view class="mode">
                        已完成: 0个
                    </view>
                    <view class="mode">
                        未完成: 0个
                    </view>
                    <view class="mode">
                        服务台解决: 0个
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
            axios
        } from '@/util/index.js'
    export default {
        data() {
            return {
                startTimeStamp:0,
                endTimeStamp:0,
                time:'',
                tableList:[],
            };
        },
        created() {
            this.time=this.$tool.dateFormat("YYYY-MM-DD")
            this.startTimeStamp=new Date(new Date().toLocaleDateString()).getTime()
            this.endTimeStamp=new Date().getTime()
        },
        methods: {
            UPday(){
                this.startTimeStamp -= 86400000
                this.endTimeStamp -= 86400000
                 this.time=this.$tool.dateFormat("YYYY-MM-DD",this.startTimeStamp)
                this.list()
            },
            downDay(){
                this.startTimeStamp += 86400000
                this.endTimeStamp += 86400000
                this.time=this.$tool.dateFormat("YYYY-MM-DD",this.startTimeStamp)
                this.list()
            },
            list(){
                let data={
                    startTimeStamp:this.startTimeStamp,
                    endTimeStamp:this.endTimeStamp
                }
              axios({
                  url: '/ywt/busOrderTotal/getTotalByTime',
                  data: {
                      ...data
                  },
                  method: 'post'
              }).then(res => {
                  this.tableList=res.body
              })
            },  
        },
        mounted() {
            this.list()
            console.log()
        }
        
    }
</script>

<style lang="scss">
    .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        font-size: 14px;
        padding-left: 15px;
        color: #1A1A1A;
    }

    .content {
        width: 100%;
        height: 100vh;
        background: #fafafa;
        padding: 0 15px;
        box-sizing: border-box;

        .pageItem {
            width: 100%;
            font-size: 13px;
            font-weight: 400;
            color: #727272;
            padding: 20px 0;
            line-height: 18px;

            .upPage {
                vertical-align: middle;
            }
        }

        .situation {
            width: 100%;
            border-radius: 12px;
            background: #fff;
            box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);

            .item1 {
                width: 100%;
                height: 32px;
                opacity: 1;
                text-align: center;
                line-height: 32px;
                font-size: 14px;
                font-weight: 500;
                background: rgba(64, 158, 255, 0.20);
                border-radius: 12px 12px 0 0;
                box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);
            }

            .item2 {
                font-size: 14px;
                font-weight: 400;
                color: #1a1a1a;
            }

            .item3 {
                padding: 0 10px;

                .circle {
                    width: 80px;
                    height: 94px;
                    text-align: center;

                    view {
                        font-size: 12px;
                        text-align: center;
                        font-weight: 400;
                    }
                }
            }

            .mode {
                min-width: 70px;
                height: 20px;
                opacity: 1;
                font-size: 14px;
                font-weight: 400;
                color: #737373;
            }
        }

        .module {
            .line {
                width: 3px;
                height: 16px;
                opacity: 1;
                background: #409eff;
                border-radius: 2px;
                margin-right: 7px;
            }

            .textTitlw {
                width: 103px;
                height: 24px;
                opacity: 1;
                font-size: 17px;
                font-family: PingFangSC, PingFangSC-Medium;
                font-weight: 500;
                text-align: left;
                color: #414141;
                line-height: 24px;
            }
        }

    }
</style>
