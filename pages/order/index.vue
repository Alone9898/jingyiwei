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
        <van-tabs active="all" sticky animated swipeable color='#409EFF' @click="tabClick" v-show='listType!=="recOrder"'>
            <van-tab v-for="(val, key) in tabsConfig"  :key="key" :title="val" :name="key" :info="redNums[key]">
            </van-tab>
        </van-tabs>
        <ITEM :listType='listType' :itemList='itemList' @getTablist='getTablist'></ITEM>
    </div>
</template>

<script>
import ITEM from './tpl/item'
import {
        axios
    } from '@/util/index.js'

const process = [
    {name: "待接单", id: 121, value: "create"},
    {name: "未派单", id: 122, value: "start"},
    {name: "未派单", id: 122, value: "back"},
    {name: "未派单", id: 122, value: ""},
    {name: "已完成", id: 123, value: "close"},
    {name: "已完成", id: 123, value: "end_termination"},
    {name: "流程暂停", id: 124, value: "suspend"},
    {name: "待评价", id: 125, value: "end_examine"},
    {name: "待审核", id: 126, value: "complete"},
    {name: "处理中", id: 127, value: "other"}
]

    export default {
        components: {ITEM},
        data() {
            return {
                queryKeyWord: '',
                listType: '',
                typeIndex: 0,
                tabsConfig: {},
                curTab: 0,
                itemList: [],
                redNums: [],
                orderType: {
                    recOrder: {
                        all: '全部',
                        // recep: '个人待接',
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
            getTablist() {
                this.init(this.curTab);
            },
            tabClick(event){
                 let templateType = (event.detail.index)
                 this.curTab = templateType
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
                        let orderAlarm
                        if(item.degree===1){
                            orderAlarm='紧急'
                        }else if(item.degree===2){
                             orderAlarm='紧急'
                        }else{
                            orderAlarm='常规'
                        }
                        obj = {
                            orderId: item.orderNum,
                            orderAlarm: orderAlarm,
                            // orderRange: uni.getStorageSync('Edition').unit.filter(cur => cur.id == item.rangeType)[0].dept_name,
                            orderRange:['个人','科室','多科室'][item.rangeType - 1],
                            createTime: item.createTime,
                            orderStatus: ['处理中','已完成','未接单','全院'][item.processState],
                            orderStatus: process.filter(cur => cur.value == item.processState)[0] ? process.filter(cur => cur.value == item.processState)[0].name : '处理中',
                            orderMsgs: [
                                {
                                  label: '报修科室',
                                  content: item.firstGroup + '-' + item.lastGroup,
                                },
                                {
                                    label: '故障分类',
                                    content: uni.getStorageSync('Edition').dic.faultClassification.filter(cur => cur.value == item.faultType)[0].name
                                },
                                {
                                    label: '故障描述',
                                    content: item.faultRemark
                                },
                                // {
                                //     label: '报修地址',
                                //     content: '成都ccdc'
                                // },
                                {
                                    label: '报障人',
                                    content: item.makeUserName,
                                    phone: item.makeUserNum
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
    }

    }
</script>
<style lang="scss" scoped>

</style>