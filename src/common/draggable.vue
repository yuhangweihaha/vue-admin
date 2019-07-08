<template>
	<div>
		<draggable @update="datadragEnd" :options="{animation:500}">
			<transition-group>
				<div v-for="(data, index) in datas" :key="data.titleName" class="drag-item" :class="data.titleName === activeName ? 'active' : ''">
					<div class="pull-left" ref="pullLeft">
						<div class="click-icon" @click="setopcity(index, data)"><img :src="data.opc" alt=""></div>
						<div class="click-type"><img :src="data.src" alt=""></div><label :title="data.titleName" disabled="disabled" @click="selectOne(index, data)">{{data.titleName}}</label></div>
					<div class="buttons">
						<i><img :src="dele" alt="" @click="deleteMyData(data)"></i>
						<i><img :src="Write" alt="" @click="clickToWrite(data)"></i>
						<i><img :src="zoom" alt=""></i>
					</div>
				</div>
			</transition-group>
		</draggable>
		<el-dialog title="数据编辑" class="writeDialog" :visible.sync="dialogVisible" :modal-append-to-body='false' width="95%">
			<div id="dialogMap" v-if="dialogVisible" :style="{height:dialogHeight}" width="100%">

			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getLayerData, updateImport, deleteData } from "@/api/map";
	import draggable from 'vuedraggable'
	import "vue2-leaflet";
	import "leaflet-draw";
	import "leaflet-draw/dist/leaflet.draw.css";
	delete L.Icon.Default.prototype._getIconUrl;
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
		iconUrl: require("leaflet/dist/images/marker-icon.png"),
		shadowUrl: require("leaflet/dist/images/marker-shadow.png")
	});
	export default {
		data() {
			return {
				dialogHeight: document.body.clientHeight - 105 + 'px',
				dialogVisible: false,
				value: "",
				opc: '',
				activeName: '',
				activeIndex: '',
				Choice: require('@/icon/wode/Choice.png'),
				noChoice: require('@/icon/wode/noChoice.png'),
				zhu1: require('@/icon/wode/zhuangtai1.png'), //点
				zhu2: require('@/icon/wode/xian.png'), //线
				zhu3: require('@/icon/wode/mian.png'), //面
				zoom: require('@/icon/wode/zoom.png'),
				Write: require('@/icon/wode/Write.png'),
				dele: require('@/icon/wode/yuyuyu.png'),
				datas: [],
				startArr: [],
				endArr: [],
				count: 0,
				map: null,
				layers: null,
				editableLayers: null,
				features: null
			}
		},
		components: {
			draggable
		},
		watch: {
			datas:{
				handler(newvalue,oldvalue){
					window.layersData=newvalue;
					 for(let i=0;i<newvalue.length;i++){
              		console.info(newvalue[i].titleName+"的显示级别是"+newvalue[i].displayLevel);
            }
				},
				deep:true
			}
		},
		methods: {
			children(curEle, tagName) {
				var nodeList = curEle.childNodes;
				var ary = [];
				if(/MSIE(6|7|8)/.test(navigator.userAgent)) {
					for(var i = 0; i < nodeList.length; i++) {
						var curNode = nodeList[i];
						if(curNode.nodeType === 1) {
							ary[ary.length] = curNode;
						}
					}
				} else {
					ary = Array.prototype.slice.call(curEle.children);
				}

				// 获取指定子元素
				if(typeof tagName === "string") {
					for(var k = 0; k < ary.length; k++) {
						var curTag = ary[k];
						if(curTag.nodeName.toLowerCase() !== tagName.toLowerCase()) {
							ary.splice(k, 1);
							k--;
						}
					}
				}

				return ary;
			},
			isJSON(str) {
				if(typeof str == 'string') {
					try {
						var obj = JSON.parse(str);
						if(typeof obj == 'object' && obj) {
							return true;
						} else {
							return false;
						}
					} catch(e) {
						console.log('error：' + str + '!!!' + e);
						return false;
					}
				}
			},
						clickToWrite(data) {
				//创建遮罩层
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)',
					target: document.querySelector('#dialogMap')
				});
				//打开编辑层
				this.dialogVisible = true;
				//创建一个要编辑的图层对象
				this.editableLayers = new L.FeatureGroup();
				//加一个0.1秒延迟创建地图,避免编辑层还没显示出来
				setTimeout(() => {
					this.map = L.map('dialogMap', {
						center: [38.59, 105.29],
						zoom: 4,
					})
					//设置地图图形
					L.tileLayer.chinaProvider("Geoq.Normal.Gray", {
						maxZoom: 18,
						minZoom: 2
					}).addTo(this.map);
				}, 100);
				//查询当前要编辑的图层WFS数据
				getLayerData(
					data.layerUrl.split(":8080")[1]
				).then(layerData => {
					//编辑弹出层
					loading.close();
					//获取要编辑的图层默认数据(用来新增时获取需要新增那些properties属性值等操作)
					this.features = layerData.features[0];
					//获取当前图层的srs
					var srs = layerData.crs.properties.name.split("::")[1];
					//判断当前要标记的图层是哪种类型点/线/面
					if(data.layerType === "Polyline" || data.layerType === "MultiLineString") {
						this.editableLayers = L.geoJson(layerData.features, {
							style: function() {
								return {
									color: '#267FCA'
								};
							},
							onEachFeature: (feature, layer) => {
								//给图层中每一个线添加点击时间,点击后初始化数据弹出层可编辑数据
								layer.on('click', (event) => {
									//创建数据弹出层html
									var html = '<div>';
									//获取弹出层数据信息
									var properties = layer.feature['properties'];
									//遍历properties中的所有属性用来输出花弹出层html
									var index = 0;
									for(var key in properties) {
										var text = properties[key];
										if(typeof(text) == "object" && Object.prototype.toString.call(text).toLowerCase() == "[object object]" && !text.length) {
											text = JSON.stringify(text);
										}
										html += "<span class='popupSpan' " + (index === 0 ? "style='display:none'" : "") + ">" + key + "</span><input " + (index === 0 ? "style='display:none'" : "") + " class='popupInput' type='text' value='" + text + "'/><br " + (index === 0 ? "style='display:none'" : "") + "/>"
										index++;
									}
									html += '<button class="popupButton el-button el-button--primary">保存</button></div>';
									//将弹出层html放入弹出层中并打开
									layer.unbindPopup().bindPopup(html).openPopup(); //默认打开
									var vthis = this;
									//给弹出层中确定按钮添加点击事件,点击后去修改properties属性值
									document.getElementsByClassName('popupButton')[0].onclick = function() {
										//根据按钮获取父元素,根据父元素去获取弹出层里面的输入框
										var inputs = vthis.children(this.parentElement, 'input');
										var i = 0;
										var obj = {};
										//根据输入框按顺序给properties的参数对象obj赋值
										for(var key in properties) {
											obj[key] = vthis.isJSON(inputs[i].value) ? JSON.parse(inputs[i].value) : inputs[i].value;
											i++;
										}
										//给这个正在操作的线对象的properties更新最新的properties数据
										layer['properties'] = obj;
										var coordinates = [];
										//获取当前线的经纬度
										layer._latlngs.forEach((item) => {
											coordinates.push([item.lng, item.lat]);
										});
										//拼参数对象
										var param = {
											"id": layer.feature.id,
											"type": layer.feature.geometry.type,
											"geometry_name": layer.feature.geometry_name,
											"properties": obj,
											"coordinates": [coordinates],
											"srs": srs,
											"dataConnection": vthis.datas[vthis.activeIndex].dataConnection
										};
										//修改接口
										updateImport([param]).then(res => {
											this.$notify({
												title: '成功',
												message: '修改成功',
												type: 'success'
											});
										})
									};
								})
							}
						}).addTo(this.map);
					} else if(data.layerType === "Point" || data.layerType === "point") {
						this.editableLayers = L.geoJson(layerData.features, {
							pointToLayer: (geoJsonPoint, latlng) => {
								var layer = L.marker(latlng);
								layer.on('click', (event) => {
									var html = '<div>';
									var properties = layer.feature['properties'];
									var index = 0;
									for(var key in properties) {
										var text = properties[key];
										if(typeof(text) == "object" && Object.prototype.toString.call(text).toLowerCase() == "[object object]" && !text.length) {
											text = JSON.stringify(text);
										}
										html += "<span class='popupSpan' " + (index === 0 ? "style='display:none'" : "") + ">" + key + "</span><input " + (index === 0 ? "style='display:none'" : "") + " class='popupInput' type='text' value='" + text + "'/><br " + (index === 0 ? "style='display:none'" : "") + "/>"
										index++;
									}
									html += '<button class="popupButton el-button el-button--primary">保存</button></div>';
									layer.unbindPopup().bindPopup(html).openPopup(); //默认打开
									var vthis = this;
									document.getElementsByClassName('popupButton')[0].onclick = function() {
										var inputs = vthis.children(this.parentElement, 'input');
										var i = 0;
										var obj = {};
										for(var key in properties) {
											obj[key] = vthis.isJSON(inputs[i].value) ? JSON.parse(inputs[i].value) : inputs[i].value;
											i++;
										}
										layer['properties'] = obj;
										var param = {
											"id": layer.feature.id,
											"type": layer.feature.geometry.type,
											"geometry_name": layer.feature.geometry_name,
											"properties": obj,
											"coordinates": [
												[
													[layer._latlng.lng, layer._latlng.lat]
												]
											],
											"srs": srs,
											"dataConnection": vthis.datas[vthis.activeIndex].dataConnection
										};
										console.log(param);
										updateImport([param]).then(res => {
											vthis.$notify({
												title: '成功',
												message: '修改成功',
												type: 'success'
											});
										})
									};
								})
								return layer;
							}
						}).addTo(this.map);
					} else if(data.layerType === "Polygon" || data.layerType === "MultiPolygon") {
						/*layerData.features.forEach((item, i) => {
							console.log(item.geometry.coordinates.length);
						})*/
						layerData.features.forEach((item, i) => {
							//var item = layerData.features[0];
							item.geometry.coordinates.forEach((item_j, j) => {
								var newArray = [];
								item_j[0].forEach((item_k) => {
									newArray.push([item_k[1], item_k[0]]);
								})
								var layer = L.polygon(newArray, {
									color: '#267FCA',
									fillColor: '#267FCA',
									fillOpacity: 0.5
								})
								layer['feature'] = item;
								layer['propertiesIndex'] = i;
								layer['dataIndex'] = j;
								layer.on('click', (event) => {
									var html = '<div>';
									var properties = layerData.features[layer['propertiesIndex']]['properties'];
									var index = 0;
									for(var key in properties) {
										var text = properties[key];
										if(typeof(text) == "object" && Object.prototype.toString.call(text).toLowerCase() == "[object object]" && !text.length) {
											text = JSON.stringify(text);
										}
										html += "<span class='popupSpan' " + (index === 0 ? "style='display:none'" : "") + ">" + key + "</span><input " + (index === 0 ? "style='display:none'" : "") + " class='popupInput' type='text' value='" + text + "'/><br " + (index === 0 ? "style='display:none'" : "") + "/>"
										index++;
									}
									html += '<button class="popupButton el-button el-button--primary">保存</button></div>';
									layer.unbindPopup().bindPopup(html).openPopup(); //默认打开
									var vthis = this;
									document.getElementsByClassName('popupButton')[0].onclick = function() {
										var inputs = vthis.children(this.parentElement, 'input');
										var i = 0;
										var obj = {};
										for(var key in properties) {
											obj[key] = vthis.isJSON(inputs[i].value) ? JSON.parse(inputs[i].value) : inputs[i].value;
											i++;
										}
										layer['properties'] = obj;
										layerData.features[layer['propertiesIndex']]['properties'] = obj;
										var coordinates = [];
										layer._latlngs[0].forEach((item) => {
											coordinates.push([item.lng, item.lat]);
										});
										coordinates.push([layer._latlngs[0][0].lng, layer._latlngs[0][0].lat]);
										layer.feature.geometry.coordinates[layer.dataIndex] = coordinates;
										coordinates = layer.feature.geometry.coordinates;
										var param = {
											"id": layer.feature.id,
											"type": layer.feature.geometry.type,
											"geometry_name": layer.feature.geometry_name,
											"properties": obj,
											"coordinates": coordinates,
											"srs": srs,
											"dataConnection": vthis.datas[vthis.activeIndex].dataConnection
										};
										updateImport([param]).then(res => {
											vthis.$notify({
												title: '成功',
												message: '修改成功',
												type: 'success'
											});

										})
									};
								})
								this.editableLayers.addLayer(layer);
							})
							 this.map.addLayer(this.editableLayers);
						})

						/*this.editableLayers = L.geoJSON(layerData.features, {
							style: function(feature) {
								return {
									color: '#267FCA',
									fillColor: '#267FCA',
									fillOpacity: 0.5
								};
							},
							onEachFeature: (feature, layer) => {
								layer.on('click', (event) => {
									var html = '<div>';
									var properties = layer.feature['properties'];
									var index = 0;
									for(var key in properties) {
										var text = properties[key];
										if(typeof(text) == "object" && Object.prototype.toString.call(text).toLowerCase() == "[object object]" && !text.length) {
											text = JSON.stringify(text);
										}
										html += "<span class='popupSpan' " + (index === 0 ? "style='display:none'" : "") + ">" + key + "</span><input " + (index === 0 ? "style='display:none'" : "") + " class='popupInput' type='text' value='" + text + "'/><br " + (index === 0 ? "style='display:none'" : "") + "/>"
										index++;
									}
									html += '<button class="popupButton el-button el-button--primary">保存</button></div>';
									layer.unbindPopup().bindPopup(html).openPopup(); //默认打开
									var vthis = this;
									document.getElementsByClassName('popupButton')[0].onclick = function() {
										var inputs = vthis.children(this.parentElement, 'input');
										var i = 0;
										var obj = {};
										for(var key in properties) {
											obj[key] = vthis.isJSON(inputs[i].value) ? JSON.parse(inputs[i].value) : inputs[i].value;
											i++;
										}
										layer['properties'] = obj;
										var param = {
											"id": layer.feature.id,
											"type": layer.feature.geometry.type,
											"geometry_name": layer.feature.geometry_name,
											"properties": obj,
											"coordinates": layer.feature.geometry.type === 'Point' ? [
												[
													[layer._latlng.lng, layer._latlng.lat]
												]
											] : layer.feature.geometry.coordinates,
											"srs": srs,
											"dataConnection": vthis.datas[vthis.activeIndex].dataConnection
										};
										updateImport([param]).then(res => {
											vthis.$notify({
												title: '成功',
												message: '修改成功',
												type: 'success'
											});
										})
									};
								})
							}
						}).addTo(this.map);*/
					} else {
						return false;
					}
					//初始化编辑空间属性
					var options = {
						position: 'topright',
						draw: {
							//判断是线的话显示画线按钮
							polyline: (data.layerType === "Polyline" || data.layerType === "MultiLineString") ? {
								shapeOptions: {
									color: '#f357a1',
									weight: 3
								}
							} : false,
							//判断是面的话显示画面按钮
							polygon: (data.layerType === "Polygon" || data.layerType === "MultiPolygon") ? {
								allowIntersection: false, // Restricts shapes to simple polygons
								drawError: {
									color: '#e1e100', // Color the shape will turn when intersects
									message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
								},
								shapeOptions: {
									color: '#bada55'
								}
							} : false,
							rectangle: false,
							circlemarker: false,
							circle: false, // Turns off this drawing tool
							//判断是点的话显示画点按钮
							marker: (data.layerType === "Point" || data.layerType === "point") ? true : false
						},
						edit: {
							//要进行编辑的图层对象
							featureGroup: this.editableLayers //REQUIRED!!
						}
					};
					var drawControl = new L.Control.Draw(options);
					this.map.addControl(drawControl);
					//新增一个点/线/面时触发的事件
					this.map.on(L.Draw.Event.CREATED, (e) => {
						var type = e.layerType,
							layer = e.layer;
						//给这个点/线/面添加点击事件
						layer.on('click', (event) => {
							var html = '<div>';
							//判断这个点/线/面是否有properties
							var isHasValue = !!layer['properties'];
							//有的话代表已经进行编辑过可以直接用本身的properties,没有的话就初始化空的properties
							var index = 0;
							var properties = isHasValue ? layer['properties'] : this.features.properties;
							for(var key in properties) {
								html += '<span class="popupSpan" ' + (index === 0 ? "style='display:none'" : "") + '>' + key + '</span><input ' + (index === 0 ? "style='display:none'" : "") + ' class="popupInput" type="text" value="' + (isHasValue ? properties[key] : '') + '"/><br ' + (index === 0 ? "style='display:none'" : "") + '/>'
								index++;
							}
							html += '<button class="popupButton el-button el-button--primary">保存</button></div>';
							layer.unbindPopup().bindPopup(html).openPopup(); //默认打开
							var vthis = this;
							document.getElementsByClassName('popupButton')[0].onclick = function() {
								var inputs = vthis.children(this.parentElement, 'input');
								var i = 0;
								var obj = {};
								for(var key in properties) {
									obj[key] = inputs[i].value;
									i++;
								}
								layer['properties'] = obj;
								var coordinates = null;
								if(type === 'marker') {
									coordinates = [
										[layer._latlng.lng, layer._latlng.lat]
									];
								} else if(type === "polyline") {
									coordinates = [];
									layer._latlngs.forEach((item) => {
										coordinates.push([item.lng, item.lat]);
									});
								} else if(type === "polygon") {
									coordinates = [];
									layer._latlngs[0].forEach((item) => {
										coordinates.push([item.lng, item.lat]);
									});
									coordinates.push([layer._latlngs[0][0].lng, layer._latlngs[0][0].lat]);
								}
								var param = {
									"id": vthis.features.id.split('.')[0],
									"type": vthis.features.geometry.type,
									"geometry_name": vthis.features.geometry_name,
									"properties": obj,
									"coordinates": [coordinates],
									"srs": srs,
									"dataConnection": vthis.datas[vthis.activeIndex].dataConnection
								};
								console.log(JSON.stringify(param));
								updateImport([param]).then(res => {
									vthis.$notify({
										title: '成功',
										message: '添加成功',
										type: 'success'
									});
									vthis.dialogVisible = false;
								})
							};
						})
						this.editableLayers.addLayer(layer);
					});
					//修改某个点/线/面后执行的操作
					this.map.on('draw:edited', (e) => {
						var layers = e.layers;
						var param = [];
						layers.eachLayer((layer) => {
							var coordinates = null;
							if(layer.feature.geometry.type === 'Point') {
								coordinates = [
									[layer._latlng.lng, layer._latlng.lat]
								];
							} else if(layer.feature.geometry.type === "LineString" || layer.feature.geometry.type === "MultiLineString") {
								coordinates = [];
								layer._latlngs[0].forEach((item) => {
									coordinates.push([item.lng, item.lat]);
								});
							} else if(layer.feature.geometry.type === "Polygon" || layer.feature.geometry.type === "MultiPolygon") {
									coordinates = [];
									layer._latlngs[0].forEach((item) => {
										coordinates.push([item.lng, item.lat]);
									});
									coordinates.push([layer._latlngs[0][0].lng, layer._latlngs[0][0].lat]);
									layer.feature.geometry.coordinates[layer.dataIndex] = coordinates;
									coordinates = layer.feature.geometry.coordinates;
							}
							param.push({
								"id": layer.feature.id,
								"type": layer.feature.geometry.type,
								"geometry_name": layer.feature.geometry_name,
								"properties": layer.feature.properties,
								"coordinates": [coordinates],
								"srs": srs,
								"dataConnection": this.datas[this.activeIndex].dataConnection
							});
						});
						console.log(JSON.stringify(param));
						updateImport(param).then(res => {
							this.$notify({
								title: '成功',
								message: '修改成功',
								type: 'success'
							});
						})
					});
					//删除某个点/线/面后执行的操作
					this.map.on('draw:deleted', (e) => {
						var layers = e.layers;
						var param = [];
						layers.eachLayer((layer) => {
							param.push(
								layer.feature.id
							);
						});
						deleteData(param).then(res => {
							this.$notify({
								title: '成功',
								message: '删除成功',
								type: 'success'
							});
						})
					});
				});
			},
			handleClose() {

			},
			upDateActiveData(data) {
				this.datas[this.activeIndex] === data;
				this.datas[this.activeIndex] = data;
				console.info(data + "9999999999999999999");
			},
			deleteMyData(data) {
				for(var i = 0; i < this.datas.length; i++) {
					if(data.pkId == this.datas[i].pkId) {
						this.datas.splice(i, 1);
					}
				}
				if(window.layers[data.pkId]) {
					window.map.removeLayer(window.layers[data.pkId]);
					if(data.layerType === "Polyline" ||
          								data.layerType === "MultiLineString"){
											  if(window.layers[data.pkId+"fanguang"]){
												  window.map.removeLayer(window.layers[data.pkId+"fanguang"]);
											  }
		  							}
				}
				for(let i=0;i<this.datas.length;i++){
					console.info(this.datas[i].titleName+this.datas[i].isopen);
					if(this.datas[i].isopen){
							window.deleteInit=true;
							this.$emit('active', this.datas[i]);
						if(this.datas[i].finallyType=="levelLayer"){
							// this.$emit('modalLis', "等级符号");
						}else if(this.datas[i].finallyType=="typeLayer"){
							// this.$emit('modalLis', "类型符号");
						}else if(this.datas[i].finallyType=="lightLayer"){
							// this.$emit('modalLis', "灯光图");
						}else if(this.datas[i].finallyType=="polymerizeLayer"){
							// this.$emit('modalLis', "聚合图");
						}else if(this.datas[i].finallyType=="temperatureLayer"){
							// this.$emit('modalLis', "热力图");
						// }else if(this.datas[i].finallyType=="levelLayer"){
						// 	this.$emit('modalLis', "默认符号");
						}else{
							// this.$emit('modalLis', "默认符号");
						}
						break;
					}
				}
			},
			selectOne(index, data) {
				this.activeIndex = index;
				this.activeName = data.titleName;
				window.deleteInit=false;
				for(var i=0;i<this.datas.length;i++){
					if(data.pkId==this.datas[i].pkId){
						this.datas[i].isopen=true;
						this.datas[i].opc=this.Choice;
						}
						break;
					}
				this.$emit('active', data);

			},
			setopcity(index, data){
				this.activeIndex=index;
				for(var i=0;i<this.datas.length;i++){
					if(data.pkId==this.datas[i].pkId){
						if(this.datas[i].opc==this.Choice){
							this.datas[i].opc=this.noChoice;
							this.datas[i].isopen=false;
							if(window.layers[data.pkId]){
								window.layers[data.pkId].remove();
									if(window.layers[data.pkId+"fanguang"]){
											 window.layers[data.pkId+"fanguang"].remove();
		  							}

								}
						}else{
							this.datas[i].opc=this.Choice;
								window.deleteInit=false;
								if(window.layers[data.pkId]){
								window.layers[data.pkId].addTo(window.map);
									if(window.layers[data.pkId+"fanguang"]){
											 window.layers[data.pkId+"fanguang"].addTo(window.map);
		  							}

								}
								this.datas[i].isopen=true;
						}
						return;
					}

				}
			},
			updateData(data) {
				if(data.length > 1) {
					for(var i = 0; i < data.length; i++) {
						if(i == data.length - 1) {
							data[i].opc = this.noChoice;
						} else {
							data[i].opc = this.Choice;
						}
					}

				} else {
					data[0].opc = this.Choice;
				}
				for(var i = 0; i < data.length; i++) {
					if(data[i].layerType === "Point") {
						data[i].src = this.zhu1;
					} else if(data[i].layerType === "Polyline" ||
						data[i].layerType === "MultiLineString") {
						data[i].src = this.zhu2;

					} else if(data[i].layerType === "Polygon" ||
						data[i].layerType === "MultiPolygon") {
						data[i].src = this.zhu3;

					}
				}
				if(this.datas.length < 1) {
					this.datas = data;
				} else {
					var v_this = this;
					var isHave = false;
					data.forEach(function(item) {
						isHave = false;
						var itemId = item.pkId ? item.pkId : item.layerId;
						v_this.datas.forEach(function(item2) {
							var item2Id = item2.pkId ? item2.pkId : item2.layerId;
							if(itemId === item2Id) {
								isHave = true;
							}
						})
						if(!isHave) {
							v_this.datas.unshift(item);
						}
					})
				}
				this.selectOne(0, this.datas[0]);

			},
			getData() {
				var data = [];
				/*this.datas.forEach(function(item, index){
				            item.layerOrder = index + 1;
				            item.layerId = item.pkId;
				            delete item.updTime;
				            data.push(item);
				        })*/
				var newDatas = JSON.parse(JSON.stringify(this.datas));
				newDatas.forEach(function(item, index) {
					item.layerOrder = index + 1;
					item.layerId = item.pkId;
					item.displayLevel = item.displayLevel ? item.displayLevel : 1;
					item.transparency = item.transparency ? item.transparency : 0;
					item.iconId = item.iconId ? item.iconId : '1';
					item.iconColor = item.iconColor ? item.iconColor : '#E1E1E1';
					item.iconSize = item.iconSize ? item.iconSize : '12';
					item.borderStyle = item.borderStyle ? item.borderStyle : 'solid';
					item.borderWidth = item.borderWidth ? item.borderWidth : '1';
					item.borderColor = item.borderColor ? item.borderColor : '#E1E1E1';
					item.fillColor = item.fillColor ? item.fillColor : '#B4B42D';
					delete item.updTime;
					delete item.pkId;
					data.push(item);
				})
				return data;
			},
			sleep(numberMillis) {    
				var now = new Date();    
				var exitTime = now.getTime() + numberMillis;   
				while (true) { 
				now = new Date();       
				if (now.getTime() > exitTime) 
				return;    
				} 
			},
			datadragEnd(evt) {//图层重新排序
			for(var i in window.layers){
				if(window.layers[i].remove){
					window.layers[i].remove();
				}

       		 }
				let ary=evt.srcElement.children;
				for(let i=ary.length-1;i>=0;i--){
					console.info(ary[i].innerText);
					for(let j=0;j<this.datas.length;j++){
						if(this.datas[j].titleName==ary[i].innerText){
							if(this.datas[j].isopen){
									window.layers[this.datas[j].pkId].addTo(window.map);
									if(window.layers[this.datas[j].pkId+"fanguang"]){
										window.layers[this.datas[j].pkId+"fanguang"].addTo(window.map);
									}
							}
							continue;
						}
					}
				}

			}
		},
		mounted() {
			//为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}
</script>

<style lang="less" scoped>
	.drag-item.active {
		border: 1px solid #397ea8;
	}

	.drag-item:hover {
		border: 1px solid #397ea8;
	}

	.drag-item {
		border: 1px solid #ccc;
		height: 20px;
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
<style lang="less">
	.writeDialog {
		.el-dialog {
			margin-top: 20px!important;
		}
	}

	#dialogMap {}

	.caozuoUl {
		list-style: none;
		position: absolute;
		z-index: 999;
		border-radius: 2px;
		top: 80px;
		left: 30px;
		li {
			width: 25px;
			height: 25px;
			border: 1px solid rgba(0, 0, 0, .2);
			cursor: pointer;
			background-color: #FFFFFF;
		}
		li:hover {
			background-color: #CCCCCC;
		}
	}

	.popupInput {
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		height: 30px;
	}

	.popupSpan {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 48px;
		display: inline-block;
	}
</style>
