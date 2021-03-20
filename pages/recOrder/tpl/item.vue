/*
* create by zhilong li
* @Mar 20, 2021
*/
<template>
    <view class='item_body'>
        <view class="item_card" v-for="i in 10" :key="i">
            <view class="top_msg">
                <view class="top_msg_left">
                    <view>紧急</view>
                    <view>全院</view>
                </view>
                <view class="top_msg_right">
                    <view>
                        <text>工单：2353464745</text>
                        <text>接待</text>
                    </view>
                    <view>
                        建单时间：2021-02-03 19:00
                    </view>
                </view>
            </view>
            <view class="content_msg">
                <view class="content_title">
                    <text>康复维修组</text>
                    <text>后勤保障部-设备维修科</text>
                </view>
                <view class="content_body">
                    <van-cell center is-link>
                        <view slot="title">
                            <view class="van-cell-text">单元格</view>
                            <view class="van-cell-text">单元格</view>
                            <view class="van-cell-text">单元格</view>
                        </view>
                    </van-cell>
                </view>
                <view class="content_btn">
                    <van-button size="small" round type="info">接 单</van-button>
                    <van-button size="small" round type="info">退 单</van-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            
        },
    }
</script>
<style lang="scss" scoped>
.item_body{
    height: 100%;
    padding: 30rpx;
    background: #f5f5f5;
    .item_card{
        width: 100%;
        background: #fff;
        margin-bottom: 40rpx;
        box-shadow: 0px 0px 10px 0px #f3f3f3;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        .top_msg{
            display: flex;
            height: 120rpx;
            .top_msg_left{
                width: 160rpx;
                height: 100%;
                text-align: center;
                display: flex;
                flex-direction: column;
                view{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                view:nth-child(1){
                    background: red;
                    color: #fff;
                    border-radius: 20rpx 0 0 0;
                }
                view:nth-child(2){
                    border-right: 1rpx solid #ccc;
                    border-bottom: 1rpx solid #ccc;

                }
            }
            .top_msg_right{
                height: 120rpx - 1rpx;
                flex: 1;
                display: flex;
                flex-direction: column;
                color: rgb(124, 124, 124);
                font-size: 28rpx;
                border-bottom: 1rpx solid #ccc;
                &>view{
                    flex: 1;
                    padding-left: 20rpx;
                    display: flex;
                    align-items: center;
                }
                &>view:nth-child(1){
                    display: flex;
                    justify-content: space-between;
                    &>text:nth-child(2){
                        color: red;
                        margin-right: 20rpx;
                        
                    }
                }
            }
        }
        .content_msg{
            flex: 1;
            padding: 20rpx;
            .content_title{
                text:nth-child(1){
                    font-size: 44rpx;
                    font-weight: 600;
                }
                text:nth-child(2){
                    margin-left: 30rpx;
                    font-size: 28rpx;
                    color: rgb(124, 124, 124);
                }
            }
            .content_btn{
                height: 80rpx;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                van-button{
                    margin-left: 20rpx;
                }
            }
        }
    }
}
</style>