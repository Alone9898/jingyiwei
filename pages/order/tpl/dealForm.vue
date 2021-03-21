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
                        :value="''"
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
                <van-button round type="info" block>{{ fromConfig.submit.label }}</van-button>
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

<script>
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
            }
        },
        data() {
            return {
                fromConfig: {},
                submitForm: {},
            }
        },
        
        computed: {
            show: function() {
                this.fromConfig = {};
                this.submitForm = {};
                if (!this.clickType) return false;
                this.fromConfig = dealFormConfig[this.clickType];
                this.fromConfig.form.forEach(ele => {
                    if (ele.hasOwnProperty('show')) this.submitForm[ele.show] = false;
                    if (ele.type === 'file') this.submitForm.fileList = [];
                    this.submitForm[ele.key] = ele.value;
                });
                return this.nodeId;
            }
        },
        methods: {
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
                this.submitForm[item.show] = false;
                this.$forceUpdate();
            },
            // 关闭表单弹窗
            onClose() {
                this.$parent.nodeId = 0;
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