/*
* create by zhilong li
* @Mar 20, 2021
*/
<template>
    <div class='orderDetail_body'>
        <view class="order_id">工单号：{{ orderId }}</view>
        <view class="msg_card" v-for="(item, index) in orderMsgList" :key="index">
            <van-transition :show="(ismore && index !== 0) || (index === 0)" name="fade-up">
                <view class="title">
                    <view>{{ item.title }}</view>
                </view>
                <view class="msg_content">
                    <view v-for="(cur, ix) in item.msgs" :key="ix">
                        <text class="label">{{ cur.label }}：</text>
                        <text class="value" v-if="cur.type === 'text'">{{ cur.value }}</text>
                        <text class="value" v-if="cur.type === 'audio'">{{ cur.value }}</text>
                        <text class="value" v-if="cur.type === 'file'">{{ cur.value }}</text>
                    </view>
                </view>
            </van-transition>
        </view>
        <view class="more_msg" @click="ismore = !ismore">
            <view>{{ !ismore ? '更多信息' : '收起' }}</view>
            <van-icon :name="!ismore ? 'arrow-down' : 'arrow-up'" />
        </view>
        <view class="bottom_btn">
            <van-button round :plain="listType !== 'recOrder'" block v-for="(cur, index) in btnConfig[listType]" :key="index" type="info" @click="dealOrder(cur)">{{ cur.label }}</van-button>
        </view>
        <deal-from :nodeId='nodeId' :clickType='clickType'></deal-from>
    </div>
</template>

<script>
import {
        axios
    } from '@/util/index.js'
import dealFrom from './dealForm'
    export default {
         components: { dealFrom },
        data() {
            return {
                nodeId: 0,
                ismore: false,
                orderId: '',
                clickType:  '',
                listType: '',
                orderMsgList: [],
                btnConfig: {
                    recOrder: [
                        {label: '接单', type: 'accep'},
                        {label: '退单', type: 'reback'}
                    ],
                    myOrder: [
                        {label: '完成', type: 'carry'},
                        {label: '暂停处理', type: 'suspend'},
                        {label: '处理', type: 'deal'},
                        {label: '转交', type: 'deliver'},
                        {label: '多人协助', type: 'assist'},
                        {label: '终止工单', type: 'terminal'},
                        {label: '退回', type: 'return'},
                        {label: '工单升级', type: 'upgrade'},
                        {label: '送修', type: 'repair'},
                    ]
                },
                orderInfo: {},
                orderMsg: [
                    {
                        title: '故障信息',
                        msgs: [
                            { label: '建单人', value: '张三', type: 'text', source: '', col: 'col2' },
                            { label: '建单时间', value: '2021-3-5', type: 'text', source: '', col: 'col2' },
                            { label: '来源', value: '电话报障', type: 'text', source: '', col: 'col2' },
                            { label: '所需工时', value: '5445', type: 'text', source: '', col: 'col2' },
                            { label: '建单时间', value: '2021-3-5 18:00', type: 'text', source: '' },
                            { label: '来源', value: '电话报修', type: 'text', source: '' },
                        ]
                    },
                    {
                        title: '接听信息',
                        msgs: [
                            { label: '建单人', value: '张三', type: 'text', source: '', col: 'col2' },
                            { label: '建单时间', value: '2021-3-5', type: 'text', source: '', col: 'col2' },
                            { label: '来源', value: '电话报障', type: 'text', source: '', col: 'col2' },
                            { label: '所需工时', value: '5445', type: 'text', source: '', col: 'col2' },
                            { label: '建单时间', value: '2021-3-5 18:00', type: 'text', source: '' },
                            { label: '详细说明', value: '设备老化', type: 'text', source: '' },
                            { label: '来源', value: '电话报修', type: 'text', source: '' },
                        ]
                    },
                    {
                        title: '故障信息',
                        msgs: [
                            { label: '建单人', value: '张三', type: 'text', source: '', col: 'col2' },
                            { label: '建单时间', value: '2021-3-5', type: 'text', source: '', col: 'col2' },
                            { label: '来源', value: '电话报障', type: 'text', source: '', col: 'col2' },
                            { label: '所需工时', value: '5445', type: 'text', source: '', col: 'col2' },
                            { label: '建单时间', value: '2021-3-5 18:00', type: 'text', source: '' },
                            { label: '来源', value: '电话报修', type: 'text', source: '' },
                        ]
                    },
                ]
            }
        },
        watch: {
            ismore: {
                handler: function(val) {
                    if (val) {
                        this.orderMsgList = JSON.parse(JSON.stringify(this.orderMsg));
                    } else {
                        this.orderMsgList = [JSON.parse(JSON.stringify(this.orderMsg[0]))];
                    }
                }
            }
        },
        computed: {
            
        },
        methods: {
            // 工单处理按钮
            dealOrder(cur) {
                if (this.listType === 'myOrder') { // 只有我的工单能弹窗处理
                    this.clickType = cur.type;
                    this.nodeId = new Date().getTime();
                } else if (this.listType === 'recOrder' && cur.type === 'reback') {
                    // 
                    this.clickType = cur.type;
                    this.nodeId = new Date().getTime();
                } else if (this.listType === 'recOrder' && cur.type === 'accep') {
                    axios({
                        url: '/ywt/busOrderFault/nextOrder?orderNum=' + this.orderId,
                        method: 'post'
                    }).then(res => {
                        if (res.code === 0) {
                            uni.showToast({
                                title: '接单成功',
                                duration: 2000
                            });
                        }
                    })
                }
            }
        },
        onLoad: function (option) {
            this.orderId = option.orderId;
            let info = this.$api.postDataRequest('GET_ORDER_INFO', {orderNum: this.orderId});
            this.orderInfo = info;
            this.listType = option.type;
            if (option.showdeal) {
               setTimeout(() => {
                this.clickType = 'reback';
                this.nodeId = new Date().getTime();
               }, 500)
            }
            this.orderMsgList = [JSON.parse(JSON.stringify(this.orderMsg[0]))];
        },
        mounted() {
            
        }
        
    }
</script>
<style lang="scss" scoped>
.orderDetail_body{
    background: rgb(250,250,250);
    height: 94vh;
    padding: 20rpx;
    position: relative;
    .order_id{
        font-size: 28rpx;
        color: rgb(144, 144, 144);
        margin: 10rpx 0;
    }
    .msg_card{
        background: #fff;
        border-radius: 20rpx;
        box-shadow: 0px 0px 10px 0px #f0f0f0;
        margin-bottom: 40rpx;
        .title{
            padding: 20rpx 0;
            border-bottom: 1rpx solid rgb(231, 231, 231);
            view{
                border-left: 8rpx solid rgb(64,158,255);
                text-indent: 10rpx;
                font-size: 32rpx;
                font-weight: 600;
            }
        }
        .msg_content{
            min-height: 100rpx;
            padding: 20rpx;
            &>view{
                font-size: 28rpx;
                margin: 8rpx 0;
                .label{
                    color: rgb(144, 144, 144);
                }
            }
        }
    }
    .more_msg{
        display: flex;
        justify-content: center;
        color: rgb(64,158,255);
        padding-bottom: 400rpx;
    }
    .bottom_btn{
        position: fixed;
        background: #fff;
        height: 360rpx;
        padding-bottom: 30rpx;
        width: 100vw;
        bottom: 0;
        left: 0;
        display: flex;
        flex-wrap: wrap;
        van-button{
            flex: 1;
            min-width: 27vw;
            text-align: center;
            margin: 0 3vw;
            display: flex;
            align-items: center;
        }
    }
}
</style>