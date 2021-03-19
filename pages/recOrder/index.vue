/*
* create by zhilong li
* @Mar 20, 2021
*/
<template>
    <div class='index_body'>
        <van-search
        value="{{ queryKeyWord }}"
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
        />
        <van-tabs active="a" sticky animated swipeable color='#409EFF'>
            <van-tab v-for="(val, key) in tabsConfig" :key="key" :title="val" :name="key">
                <ITEM></ITEM>
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
                tabsConfig: {
                    all: '全部',
                    recep: '接待',
                    proce: '处理中',
                    comment: '待评价',
                    pending: '待审核'
                }
            }
        },
        methods: {
            
        },
        onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
            console.log(option); //打印出上个页面传递的参数。
        }
        
    }
</script>
<style lang="scss" scoped>

</style>