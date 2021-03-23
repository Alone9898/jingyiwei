/*
* create by zhilong li
* @Mar 20, 2021
*/
<template>
    <view class='item_body'>
        <view class="item_card" v-for="item in itemList" :key="item.orderId">
            <view class="top_msg">
                <view class="top_msg_left">
                    <view :class="[orderAlarmConfig[item.orderAlarm]]">{{ item.orderAlarm }}</view>
                    <view>{{ item.orderRange }}</view>
                </view>
                <view class="top_msg_right">
                    <view>
                        <text>工单号：{{ item.orderId }}</text>
                        <text :class="[orderStatusConfig[item.orderStatus]]">{{ item.orderStatus }}</text>
                    </view>
                    <view>
                        建单时间：{{ item.createTime }}
                    </view>
                </view>
            </view>
            <view class="content_msg">
                <view class="content_title">
                    <text>{{ item.orderGroup }}</text>
                    <text>{{ item.orderDepart }}</text>
                </view>
                <view class="content_body">
                    <van-cell center :is-link="listType !== 'revOrder'" @click="queryDetail(item)">
                        <view slot="title">
                            <view class="van-cell-text" v-for="(cur, index) in item.orderMsgs" :key="index">
                                <text class="title">{{ cur.label }}：</text>
                                <text v-if="!cur.phone">{{ cur.content }}</text>
                                <text v-else>
                                    <text>{{ cur.content }}</text>
                                    <text class="phone">{{ cur.phone }}</text>
                                </text>
                            </view>
                        </view>
                    </van-cell>
                </view>
                <view class="content_btn" v-if="item.orderStatus === '待接'&& listType === 'recOrder'">
                    <van-button size="small" round type="info">接 单</van-button>
                    <van-button size="small" round type="info">退 单</van-button>
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
        props: {
            listType: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                orderAlarmConfig: {
                    "紧急": 'emerge',
                    "较急": 'warning',
                    "常规": 'normal'
                },
                orderStatusConfig: {
                    "未接单": "recep",
                    "处理中": "proce",
                    "待评价": "comm",
                    "待审核": "pend",
                    "已完成": 'comp'
                },
                itemList: [{
                        orderId: '235346453456467',
                        orderAlarm: '紧急',
                        orderRange: '全院',
                        createTime: '2021-3-2 18:00',
                        orderStatus: '待接',
                        orderGroup: '康复维修组',
                        orderDepart: '后勤保障部-设备维修科',
                        orderMsgs: [{
                                label: '故障分类',
                                content: '工业故障'
                            },
                            {
                                label: '故障描述',
                                content: '设备老化，造成设备无法使用'
                            },
                            {
                                label: '报障人',
                                content: '张三',
                                phone: '1847493485'
                            }
                        ]
                    },
                    {
                        orderId: '23534645646745756',
                        orderAlarm: '较急',
                        orderRange: '全院',
                        createTime: '2021-3-2 18:00',
                        orderStatus: '处理中',
                        orderGroup: '康复维修组',
                        orderDepart: '后勤保障部-设备维修科',
                        orderMsgs: [{
                                label: '故障分类',
                                content: '工业故障'
                            },
                            {
                                label: '故障描述',
                                content: '设备老化，造成设备无法使用'
                            },
                        ]
                    },
                    {
                        orderId: '2353464564678789',
                        orderAlarm: '紧急',
                        orderRange: '全院',
                        createTime: '2021-3-2 18:00',
                        orderStatus: '待评价',
                        orderGroup: '康复维修组',
                        orderDepart: '后勤保障部-设备维修科',
                        orderMsgs: [{
                                label: '故障分类',
                                content: '工业故障'
                            },
                            {
                                label: '故障描述',
                                content: '设备老化，造成设备无法使用'
                            },
                            {
                                label: '报障人',
                                content: '张三',
                                phone: '1847493485'
                            }
                        ]
                    },
                    {
                        orderId: '2353464578789',
                        orderAlarm: '常规',
                        orderRange: '全院',
                        createTime: '2021-3-2 18:00',
                        orderStatus: '已完成',
                        orderGroup: '康复维修组',
                        orderDepart: '后勤保障部-设备维修科',
                        orderMsgs: [{
                                label: '故障分类',
                                content: '工业故障'
                            },
                            {
                                label: '故障描述',
                                content: '设备老化，造成设备无法使用'
                            },
                            {
                                label: '报障人',
                                content: '张三',
                                phone: '1847493485'
                            }
                        ]
                    },
                ]
            }
        },
        methods: {
            // 查看工单详情
            queryDetail(item) {
                if (this.listType === 'revOrder') return false; // 审核工单暂时不能查看详情
                uni.navigateTo({
                    url: "./tpl/orderDetail?orderId=" + item.orderId + '&type=' + this.listType
                })
            }
        },
        mounted() {
        }
    }
</script>
<style lang="scss" scoped>
    .emerge {
        background: rgb(250, 81, 81);
    }

    .warning {
        background: rgb(245, 187, 0);
    }

    .normal {
        background: rgb(101, 101, 101);
    }

    .recep {
        color: rgb(250, 81, 81);
    }

    .proce {
        color: rgb(64, 158, 255);
    }

    .comm {
        color: rgb(48, 203, 122);
    }

    .pend {
        color: rgb(46, 46, 46);
    }

    .comp {
        color: #ccc;
    }

    .item_body {
        height: 100%;
        padding: 30rpx;
        background: #f5f5f5;

        .item_card {
            width: 100%;
            background: #fff;
            margin-bottom: 40rpx;
            box-shadow: 0px 0px 10px 0px #f3f3f3;
            border-radius: 20rpx;
            display: flex;
            flex-direction: column;

            .top_msg {
                display: flex;
                height: 120rpx;

                .top_msg_left {
                    width: 160rpx;
                    height: 100%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;

                    view {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }

                    view:nth-child(1) {
                        color: #fff;
                        border-radius: 20rpx 0 0 0;
                    }

                    view:nth-child(2) {
                        border-right: 1rpx solid rgb(231, 231, 231);
                        border-bottom: 1rpx solid rgb(231, 231, 231);

                    }
                }

                .top_msg_right {
                    height: 120rpx - 1rpx;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    color: rgb(124, 124, 124);
                    font-size: 28rpx;
                    border-bottom: 1rpx solid rgb(231, 231, 231);

                    &>view {
                        flex: 1;
                        padding-left: 20rpx;
                        display: flex;
                        align-items: center;
                    }

                    &>view:nth-child(1) {
                        display: flex;
                        justify-content: space-between;

                        &>text:nth-child(2) {
                            margin-right: 20rpx;
                            font-weight: 600;
                        }
                    }
                }
            }

            .content_msg {
                flex: 1;
                padding: 20rpx;

                .content_title {
                    text:nth-child(1) {
                        font-size: 44rpx;
                        font-weight: 600;
                    }

                    text:nth-child(2) {
                        margin-left: 30rpx;
                        font-size: 28rpx;
                        color: rgb(124, 124, 124);
                    }
                }

                .content_body {
                    .title {
                        color: rgb(124, 124, 124);
                    }

                    .phone {
                        color: #409EFF;
                        text-decoration: underline;
                        margin-left: 10rpx;
                    }
                }

                .content_btn {
                    height: 80rpx;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;

                    van-button {
                        margin-left: 20rpx;
                    }
                }
            }
        }
    }
</style>
