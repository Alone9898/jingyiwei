<template>
	<view>
        <view class="title">
            <text>2021年03月13日</text>
            <text class="ml-15">运维日报</text>
        </view>
		<view class="content">
		    <view class="align-center flex pageItem space-between">
		        <view class="upPage flex align-center ">
                    <van-icon name="arrow-left" />
		            前一天
		        </view>
                <view>
                     <text>2021年03月13日</text>
                      <text class="ml-15">运维日报</text>
                </view>
                <view class="downPage flex align-center">
                    后一天
                    <van-icon name="arrow" />
                </view>
		    </view>
		<view class="situation">
		    <view class="item1">
		        值班服务台
                <van-divider />
		    </view>
		</view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
    .title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        font-size: 14px;
        padding-left: 15px;
        color: #1A1A1A;
    }
  .content{
        width: 100%;
        height: 100vh;
        background: #fafafa;
        padding: 0 15px;
        box-sizing: border-box;
        .pageItem{
            width: 100%;
            font-size: 13px;
            font-weight: 400;
            color: #727272;
            padding: 20px 0;
            line-height: 18px;
            .upPage{
                vertical-align: middle;
            }
        }
        .situation{
            width: 100%;
            height: 178px;
            border-radius: 12px;
            background: #fff;
            .item1{
                width: 100%;
                height: 32px;
                opacity: 1;
                text-align: center;
                line-height: 32px;
                font-size: 14px;
                font-weight: 500;
                background: rgba(64,158,255,0.20);
                border-radius: 12px 12px 0 0;
                box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.08);
            }
        }
       
        }
</style>
