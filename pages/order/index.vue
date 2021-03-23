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
            <van-tab v-for="(val, key) in tabsConfig" :itemList='itemList' :key="key" :title="val" :name="key">
                <ITEM :listType='listType'></ITEM>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
<<<<<<< HEAD
    import ITEM from './tpl/item'
    import {
        axios
    } from '@/util/index.js'

=======
import ITEM from './tpl/item'
import {
        axios
    } from '@/util/index.js'
>>>>>>> d91df8aecf510aa74911af58f7a3397cb995479d
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
                    let tableData = res.list
                    let obj = {}
                    tableData.forEach(item => {
                        obj = {
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