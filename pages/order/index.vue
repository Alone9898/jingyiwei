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
        <van-tabs active="all" sticky animated swipeable color='#409EFF'>
            <van-tab v-for="(val, key) in tabsConfig" :key="key" :title="val" :name="key">
                    <ITEM :listType='listType'></ITEM>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import ITEM from './tpl/item'
    export default {
        components: { ITEM },
        data() {
            return {
                queryKeyWord: '',
                listType: '',
                tabsConfig: {},
                orderType: {
                    recOrder: {
                        all: '全部',
                        recep: '接待',
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
                }
            }
        },
        methods: {
            
        },
        onLoad: function (option) {
            this.listType = option.type;
            this.tabsConfig = this.orderType[option.type];
        }
        
    }
</script>
<style lang="scss" scoped>

</style>