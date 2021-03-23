<template>
	<view>
		<van-cell-group>
		  <van-field
		    :value="value"
		    placeholder="请输入用户名"
		    bind:change="onChange"
		  />
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			};
		}
	}
</script>

<style lang="scss">

</style>
