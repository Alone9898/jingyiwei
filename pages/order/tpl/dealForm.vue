/*
* create by zhilong li
* @Mar 20, 2021
*/
<template>
    <van-action-sheet 
    :show="show" 
    :close-on-click-overlay='false'
    :title="fromConfig.title"
    @close="onClose">
        <view class="form_box">
            <van-cell-group v-for="(item, index) in fromConfig.form" :key="index">
                <!-- 下拉选择 -->
                <view v-if="item.type === 'pick'">
                    <van-cell 
                    :title="item.label" 
                    :value='submitForm[item.key]' 
                    is-link 
                    @click="cellClick(arguments, item, true)" />
                    <van-popup
                        :show="submitForm[item.show]"
                        :close-on-click-overlay='false'
                        round
                        position="bottom"
                        custom-style="height: 50%">
                            <van-picker 
                            show-toolbar 
                            :columns="item.option" 
                            @cancel="cellClick(arguments, item, false)"
                            @confirm="onConfirm(arguments, item)" />
                        </van-popup>
                </view>
                <!-- 上传 -->
                <view v-if="item.type === 'file'" class="file">
                      <van-field
                        :value="submitForm[item.key]"
                        center
                        readonly
                        label="附件"
                        :border="true"
                    >
                        <van-button slot="button" round plain size="small" type="info" @click="uploadFile">上 传</van-button>
                        <van-button style="margin: 0 60rpx" slot="button" round size="small" type="info" @click="takePicture">拍 照</van-button>
                    </van-field>
                    <view class="file_list">
                        <view v-for="(file, filindex) in submitForm.fileList" :key="filindex">
                            <text>{{ file.name || file.path.split('//')[1] }}</text>
                            <van-icon name="clear" size="24px" @click="deleteFile(filindex)"/>
                        </view>
                    </view>
                </view>
                <!-- 时间选择 -->
                <view v-if="item.type === 'time'">
                    <van-cell 
                    :title="item.label" 
                    :value='submitForm[item.key]' 
                    is-link 
                    @click="cellClick(arguments, item, true)" />
                    <van-popup
                        :show="submitForm[item.show]"
                        :close-on-click-overlay='false'
                        round
                        position="bottom"
                        custom-style="height: 50%">
                            <van-datetime-picker
                            type="datetime"
							show-toolbar
                            :value="new Date().getTime()"
                            @cancel="cellClick(arguments, item, false)"
                            @confirm="onConfirm(arguments, item)"/>
                        </van-popup>
                </view>
                <!-- 文本输入 -->
                <view v-if="item.type === 'text'">
                    <van-field
                        :label='item.label'
                        :value="submitForm[item.key]"
                        input-align='right'
                        center
                        @input='textInput(arguments, item)'
                        :placeholder="'请输入' + item.label"
                        :border="false"/>
                </view>
                <!-- 文本域输入 -->
                <view v-if="item.type === 'textarea'">
                   <van-field
                        :value="submitForm[item.key]"
                        :label="item.label"
                        input-align='right'
                        type="textarea"
                        @input='textInput(arguments, item)'
                        :placeholder="'请输入' + item.label"
                        :autosize="{
                            maxHeight: 100, minHeight: 50
                        }"
                        />
                </view>
                <!-- 单选 -->
                <view class="cell_box" v-if="item.type === 'radio'">
                    <text>{{ item.label }}</text>
                    <van-radio-group 
                    :value="submitForm[item.key]" 
                    direction="horizontal" 
                    @change="onRadioChange(arguments, item.key)">
                        <van-radio v-for="(cur, ix) in item.option" :key="ix" :name="cur.value">{{ cur.text }}</van-radio>
                    </van-radio-group>
                </view>
                <!-- 开关 -->
                <view class="cell_box" v-if="item.type === 'switch'">
                    <text>{{ item.label }}</text>
                    <van-switch 
                    :checked="submitForm[item.key]" 
                    size="24px" 
                    @change="onSwitchChange(arguments, item.key)"/>
                </view>
            </van-cell-group>
            <view class="btn_box">
                <van-button round type="info" block @click="submit">{{ fromConfig.submit.label }}</van-button>
            </view>
        </view>
    </van-action-sheet>
</template>

/*
*  {"label": "费用（元）", "key": "cost", "value": "", "type": "text"},
*  {"label": "故障分类", "key": "faultclass", "value": "", "type": "textarea"},
*  {"label": "故障分类", "key": "faulttype", "value": "", "type": "pick", "show": "faltshow", "option": [
*    {"text": "xxx", "value": 0},
*    {"text": "455", "value": 1},
*    {"text": "df", "value": 2},
*    {"text": "tu", "value": 3}
*  ]},
*  {"label": "附件", "key": "notion", "value": "", "type": "file"},
*  {"label": "存入知识库", "key": "issave", "value": false, "type": "switch"},
*  {"label": "设备重要性", "key": "isness", "value": 1, "type": "radio", "option": [
*    {"text": "重要", "value": 1},
*    {"text": "不重要", "value": 0}
*  ]}
*/

/**
// {"label": "设备编号", "key": "depart", "value": "", "type": "text"},
// {"label": "设备名称", "key": "fault", "value": "", "type": "text"},
// {"label": "设备分类", "key": "person", "value": "", "type": "pick", "show": "personshow", "option": [
//   {"text": "张三", "value": 0},
//   {"text": "李四", "value": 1},
//   {"text": "王五", "value": 2},
//   {"text": "赵四", "value": 3}
// ]},
// {"label": "设备型号", "key": "fault", "value": "", "type": "text"},
// {"label": "设备序列号", "key": "fault_num", "value": "", "type": "text"},
// {"label": "设备重要性", "key": "isness", "value": 1, "type": "radio", "option": [
//   {"text": "重要", "value": 1},
//   {"text": "不重要", "value": 0}
// ]},
// {"label": "备注", "key": "tooltip", "value": "", "type": "textarea"},
// {"label": "故障描述", "key": "notion", "value": "", "type": "textarea"}
 */
   // {
            //     "label": "故障原因",
            //     "key": "key",
            //     "value": "",
            //     "type": "text"
            // },

<script>
import {
        axios
    } from '@/util/index.js'
import dealFormConfig from './dealForm.config.json'
    export default {
        props: {
            nodeId: {
                type: Number,
                default: 0
            },
            clickType: {
                type: String,
                default: ''
            },
            orderId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                fromConfig: {},
                submitForm: {},
                baseUrl:''
            }
        },
        
        computed: {
            show: function() {
                this.fromConfig = {};
                this.submitForm = {};
                if (!this.clickType) return false;
                this.fromConfig = dealFormConfig[this.clickType];
                this.baseUrl=this.fromConfig.submit.url
                this.fromConfig.form.forEach(ele => {
                    if (ele.hasOwnProperty('show')) this.submitForm[ele.show] = false;
                    if (ele.type === 'file') this.submitForm.fileList = [];
                    this.submitForm[ele.key] = ele.value;
                });
                this.fromConfig.form.forEach(cur => {
                    this.submitForm[cur.key] = ''
                })
                return this.nodeId;
            }
        },
        methods: {
            // 输入框
            textInput(arg, item) {
                console.log(arg, item);
                this.submitForm[item.key] = arg[0].detail;
                this.$forceUpdate();
            },
            // 删除文件
            deleteFile(index) {
                this.submitForm.fileList = this.submitForm.fileList.filter((cur, curindex) => curindex !== index);
                this.$forceUpdate();
            },
            // 文件上传
            uploadFile() {
                let _t = this;
                wx.chooseMessageFile({
                    count: 1,
                    type: 'all',
                    success: function(res) {
                        console.log('tempFiles', res);
                        _t.submitForm.fileList = [..._t.submitForm.fileList, ...res.tempFiles];
                        _t.$forceUpdate();
                        console.log('_t.submitForm.fileList', _t.submitForm.fileList);
                    }
                })
            },
            // 拍照
            takePicture() {
                let _t = this;
                wx.chooseImage({
                    count: 3,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: function(res) {
                        console.log('tempFilePaths', res);
                        _t.submitForm.fileList = [..._t.submitForm.fileList, ...res.tempFiles];
                        _t.$forceUpdate();
                        console.log('_t.submitForm.fileList', _t.submitForm.fileList);
                    }
                })
            },
            // 点击时间选择和下拉选择的cell单元格
            cellClick(arg, item, bool) {
                this.submitForm[item.show] = bool; 
                this.$forceUpdate()
            },
            // 单选点击
            onRadioChange(arg,key) {
                this.submitForm[key] = arg[0].detail;
                this.$forceUpdate();
            },
            // 开关单击
            onSwitchChange(arg, key) {
                this.submitForm[key] = arg[0].detail;
                this.$forceUpdate();
            },
            // 下拉选择确认
            onConfirm(arg, item) {
                this.submitForm[item.key] = (item.type === 'pick' ? arg[0].detail.value.text : this.$tool.dateFormat("YYYY-MM-DD hh:mm:ss", arg[0].detail));
                console.log(this.submitForm)
                this.submitForm[item.show] = false;
                this.$forceUpdate();
            },
            // 关闭表单弹窗
            onClose() {
                this.$parent.nodeId = 0;
            },
            // 提交
            submit() {
                
                if (this.clickType === 'carry') { // {label: '完成', type: 'carry'},
                    if (!this.submitForm.nowEquipment || !this.submitForm.makeWay || !this.submitForm.makeProcess) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (this.clickType === 'suspend') { // {label: '暂停处理', type: 'suspend'},
                    if (!this.submitForm.processValue) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (this.clickType === 'deal') {// {label: '处理', type: 'deal'},
                    if (!this.submitForm.makeProcess) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (this.clickType === 'deliver') {// {label: '转交', type: 'deliver'},
                    if (!this.submitForm.processValue || !(this.submitForm.makeUser + '')) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (this.clickType === 'assist') {// {label: '多人协助', type: 'assist'},
                    if (!(this.submitForm.makeUser + '') || !this.submitForm.remark) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (this.clickType === 'terminal') {// {label: '终止工单', type: 'terminal'},
                    if (!this.submitForm.processValue) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (this.clickType === 'return') {// {label: '退回', type: 'return'},
                    if (!this.submitForm.processValue) {
                        uni.showToast({
                            title: '请填写完整',
                            icon: 'none',
                            duration: 2000
                        });
                        return false;
                    }
                // } else if (this.clickType === 'upgrade') {// {label: '工单升级', type: 'upgrade'},
                //     if (!this.submitForm.processValue) {
                //         uni.showToast({
                //             title: '请填写完整',
                //             icon: 'none',
                //             duration: 2000
                //         });
                //         return false;
                //     }
                // } else if (this.clickType === 'repair') {// {label: '送修', type: 'repair'},
                //     if (!this.submitForm.processValue) {
                //         uni.showToast({
                //             title: '请填写完整',
                //             icon: 'none',
                //             duration: 2000
                //         });
                //         return false;
                //     }
                }


                this.$api.postDataRequest('DEAL_ORDER_NEXT',{...this.submitForm, orderNum: this.orderId});
                let param = ''
                Object.keys(this.submitForm).forEach(cur => {
                    param+=('&' + cur + '=' + this.submitForm[cur])
                })
                axios({
                    url: this.baseUrl+'?orderNum=' + this.orderId + param,
                    method: 'post'
                }).then(res => {
                    if(res.code===0){
                        uni.showToast({
                            title: '操作成功',
                            duration: 2000
                        });
                        this.onClose()
                        if (this.clickType === 'reback') {
                            uni.reLaunch({
                                url: '../index?type=recOrder&typeIndex=1'
                            })
                        } else {
                            uni.reLaunch({
                                url: '../index?type=myOrder&typeIndex=2'
                            })
                        }
                    }else{
                        uni.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 2000
                        });
                    }
                  
                })
            }
        },
        created() {

        },
        mounted() {
            
        }
        
    }
</script>
<style lang="scss" scoped>
.form_box{
    border-top: 1rpx solid #eaeaea;
    height: 76vh;
    overflow: scroll;
    .cell_box{
        display: flex;
        align-items: center;
        padding: var(--cell-vertical-padding,10px) var(--cell-horizontal-padding,16px);
        &>text:nth-child(1){
            margin-right: 30rpx;
            font-size: 28rpx;
            color: var(--field-label-color,#646566);
        }
    }
    .btn_box{
        padding: 40rpx 40rpx 10rpx;
        position: sticky;
        top: 100%;
    }
    .file{
        .file_list{
            view{
                font-size: 28rpx;
                padding: 20rpx 40rpx 20rpx 200rpx;
                color: var(--field-label-color,#646566);
                display: flex;
                align-items: center;
                justify-content: space-between;
                text{
                    width: 50vw;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>