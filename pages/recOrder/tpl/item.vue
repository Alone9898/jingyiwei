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
        height: 500rpx;
        width: 100%;
        background: #fff;
        margin-bottom: 40rpx;
        box-shadow: 0px 0px 10px 0px #f3f3f3;
        border-radius: 20rpx;
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
                    border-radius: 20rpx 0 0 0;
                }
                view:nth-child(2){
                    border-right: 1rpx solid #ccc;
                    border-bottom: 1rpx solid #ccc;

                }
            }
            .top_msg_right{
                height: 100%;
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

        }
    }
}
</style>