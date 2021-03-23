/*
* create by zhilong li
* @Mar 20, 2021
*/
<template>
    <div class='index_body'>
        <van-search
                :value="queryKeyWord"
                shape="round"
                background="#fff"
                placeholder="请输入搜索关键词"
        />
        <van-tabs active="all" sticky animated swipeable color='#409EFF' @click="tabClick">
            <van-tab v-for="(val, key) in tabsConfig"  :key="key" :title="val" :name="key">
                <ITEM :listType='listType' :itemList='itemList'></ITEM>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import ITEM from './tpl/item'
import {
        axios
    } from '@/util/index.js'
    export default {
        components: {ITEM},
        data() {
            return {
                queryKeyWord: '',
                listType: '',
                tabsConfig: {},
                itemList: [],
                orderType: {
                    recOrder: {
                        all: '全部',
                        recep: '未接单',
                        proce: '处理中',
                        comment: '待评价',
                        pending: '待审核'
                    },
                    myOrder: {
                        all: '全部',
                        proce: '处理中',
                        comment: '待评价',
                        pending: '待审核'
                    },
                    revOrder: {
                        all: '全部',
                        pending: '待审核'
                    }
                },
            }
        },
        methods: {
            tabClick(event){
                 let templateType = (event.detail.index + 1)
                 this.init(templateType)
            },
            init(templateType) {
                let url=''
                if(this.listType==='recOrder'){ // 接单中心
                    url='/ywt/busOrderInfo/getWeChatView'
                    wx.setNavigationBarTitle({
                      title: '接单中心'
                    })
                }else if(this.listType==='myOrder'){ // 我的工单
                    url='/ywt/busOrderInfo/getWeChatView'
                    wx.setNavigationBarTitle({
                      title: '我的工单'
                    })
                }else{ // 工单审核
                     url='/ywt/busOrderInfo/getWeChatView'
                     wx.setNavigationBarTitle({
                       title: '工单审核'
                     })
                }
                axios({
                    url: url,
                    data: {
                        templateType: templateType,
                        likeQuery: this.queryKeyWord
                    },
                    method: 'post'
                }).then(res => {
                    this.itemList = [];
                    let tableData = res.body
                    let obj = {}
                    tableData.forEach(item => {
                        obj = {
                            orderId: item.orderNum,
                            orderAlarm: '紧急',
                            orderRange: '全院',
                            createTime: item.createTime,
                            orderStatus: ['处理中','已完成','未接单'][item.rangeType],
                            orderGroup: '康复维修组',
                            orderDepart: item.deptId,
                            orderMsgs: [
                                {
                                    label: '故障分类',
                                    content: '工业故障'
                                },
                                {
                                    label: '故障描述',
                                    content: item.place
                                },
                                {
                                    label: '报修地址',
                                    content: item.place
                                },
                                {
                                    label: '报障人',
                                    content: item.user,
                                    phone: item.phone
                                }
                            ]
                        }
                        this.itemList.push(obj)
                    })
                })
            },
        },
        mounted() {
            this.init(1)
        },
        onLoad: function (option) {
            this.listType = option.type;
            console.log(option.type)
            this.tabsConfig = this.orderType[option.type];
        }

    }
</script>
<style lang="scss" scoped>

</style>