<template>
	<div class="slicksortContent">
		<SortableList lockAxis="y" v-model="datas" @input="a">
			<SortableItem v-for="(item, index) in datas" :index="index" :key="index" :data="item" />
		</SortableList>
	</div>
</template>

<script>
	import { ContainerMixin, ElementMixin } from 'vue-slicksort'
	const SortableList = {
		mixins: [ContainerMixin],
		template: '<ul class="list"><slot/></ul>'

	}
	const SortableItem = {
		mixins: [ElementMixin],
		props: ['data', 'index'],
		data() {
			return {
				nowSelect: '',
				opc: '',
				Choice: require('@/icon/wode/Choice.png'),
				noChoice: require('@/icon/wode/noChoice.png'),
				zhu1: require('@/icon/wode/zhuangtai1.png'),
				zoom: require('@/icon/wode/zoom.png'),
				Write: require('@/icon/wode/Write.png'),
				dele: require('@/icon/wode/yuyuyu.png')
			}
		},
		template: '<li class="slicksort-list"><div class="pull-left" ref="pullLeft"><div class="click-icon"><img :src="opc === data.name ? noChoice : Choice" alt=""  @mouseover="iconMoverChoice" @mouseout="iconMout"></div><div class="click-type"><img :src="zhu1" alt=""></div><label :title="data.name" contenteditable="true">{{data.name}}</label></div><div class="buttons"><i><img :src="dele" alt="" @mouseover="iconMoverDele" @mouseout="iconMout"></i><i><img :src="Write" alt=""  @mouseover="iconMoverWrite" @mouseout="iconMout"></i><i><img :src="zoom" alt="" @mouseover="iconMoverZoom" @mouseout="iconMout"></i></div></li>',
		methods: {
			iconMoverChoice() {
				this.nowSelect = 'choice';
				console.log(this.nowSelect);
			},
			iconMoverWrite() {
				this.nowSelect = 'write';
				console.log(this.nowSelect);
			},
			iconMoverZoom() {
				this.nowSelect = 'zoom';
				console.log(this.nowSelect);
			},
			iconMoverDele() {
				this.nowSelect = 'dele';
				console.log(this.nowSelect);
			},
			iconMout() {
				this.nowSelect = '';
			}
		}
	}
	export default {
		name: "",
		data() {
			return {
				datas: [{
						name: '2015年公园绿地面积（万公顷）'
					},
					{
						name: '2404年公园绿地面积（万公顷）'
					},
					{
						name: '2764年公园绿地面积（万公顷）'
					}
				]
			}
		},
		components: {
			SortableItem,
			SortableList
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style lang="less">
	.slicksortContent {
		width: 100%;
	}
	
	.slicksort-list {
		border: 1px solid #ccc;
		height: 32px;
		margin: 5px;
		padding: 5px;
		cursor: pointer;
		position: relative;
		z-index: 11;
		.pull-left {
			float: left;
			.click-icon {
				float: left;
				width: 18px;
				height: 18px;
				margin-left: 3px;
				background-position: 0 0;
				background-repeat: no-repeat;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.click-type {
				float: left;
				width: 16px;
				height: 16px;
				margin-left: 8px;
				margin-right: 8px;
				margin-top: 1px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			label {
				display: inline-block;
				margin-bottom: 5px;
				color: #fff;
				width: 132px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.buttons {
			position: absolute;
			display: block;
			right: 15px;
			top: 5px;
			i {
				margin-right: 5px;
				width: 20px;
				height: 20px;
				display: block;
				float: right;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>