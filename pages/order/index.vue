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
            <van-tab v-for="(val, key) in tabsConfig"  :key="key" :title="val" :name="key" :info="redNums[key]">
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
                typeIndex: 0,
                tabsConfig: {},
                itemList: [],
                redNums: [],
                orderType: {
                    recOrder: {
                        all: '全部',
                        recep: '个人待接',
                        // proce: '小组待接',
                        // comment: '协助待接'
                    },
                    myOrder: {
                        // all: '全部',
                        proce: '处理中',
                        comment: '差评评价',
                        pending: '未过审核'
                    },
                    revOrder: {
                        // all: '全部',
                        pending: '待审核',
                        comment: '通过',
                        proce: '未通过',
                    }
                },
            }
        },
        methods: {
            tabClick(event){
                 let templateType = (event.detail.index)
                 this.init(templateType);
            },
            init(templateType) {
                console.log(templateType);
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
                    url: url + "?templateType= " + templateType + "&likeQuery=" + this.queryKeyWord + "&type=" + this.typeIndex,
                    data: {
                        templateType: templateType,
                        likeQuery: this.queryKeyWord,
                        type: this.typeIndex
                    },
                    method: 'post'
                }).then(res => {
                    this.itemList = [];
                    this.redNums = [];
                    let tableData = res.body.data
                    let obj = {}
                    tableData.forEach(item => {
                        obj = {
                            orderId: item.orderNum,
                            orderAlarm: item.degree===1?'紧急':'较急',
                            orderRange: item.rangeType,
                            createTime: item.createTime,
                            orderStatus: ['处理中','已完成','未接单'][item.processState],
                            orderGroup: item.firstGroup,
                            orderDepart: item.firstGroup + '-' + item.lastGroup,
                            orderMsgs: [
                                {
                                    label: '故障分类',
                                    content: item.faultType
                                },
                                {
                                    label: '故障描述',
                                    content: item.faultRemark
                                },
                                {
                                    label: '报修地址',
                                    content: '成都ccdc'
                                },
                                {
                                    label: '报障人',
                                    content: item.postUserName,
                                    phone: item.postUserNum
                                }
                            ]
                        }
                        this.itemList.push(obj)
                    })
                    Object.keys(res.body.redInfo).forEach(cur => {
                        this.redNums.push(res.body.redInfo[cur]);
                    })
                    this.$forceUpdate();
                })
            },
        },
        mounted() {
            this.init(0)
        },
        onLoad: async function (option) {
            this.listType = option.type;
            this.typeIndex = option.typeIndex;
            this.tabsConfig = this.orderType[option.type];
            axios({
                url: '/ywt/outer/getEditionList?dicList=dic,unit,user',
                method: 'post'
            }).then(res => {
                uni.setStorage({
                    key: 'Edition',
                    data: res.body,
                })
            })
    }

    }
</script>
<style lang="scss" scoped>

</style>