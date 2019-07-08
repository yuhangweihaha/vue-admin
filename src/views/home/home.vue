<template>
  <div id="myhome">
    <div class="page bgd">
      <div class="home-title">
        <h3>数据类型统计</h3>
        <div class="met-selec">
          <el-select
            v-model="currySelect"
            value-key="id"
            placeholder="选择数据类型"
            @change="selectChange"
          >
            <el-option
              v-for="node in selectData"
              :label="node.name"
              :key="node.id"
              :value="node.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="home-list">
        <ul>
          <li v-for="item in listData" :key="item.name" :title="item.name">
            <div class="list-wrap">
              <span class="list-title">{{ item.name }}</span>
              <span class="list-img-wrap">
                <span class="list-bg"></span>
                <span class="list-bg2"></span>
                <span class="list-img"></span>
              </span>
              <span class="list-count">{{ item.count }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="pages mid">
      <div class="bgdsm mid-inner">
        <div class="home-title">
          <h3>数据趋势</h3>
          <div class="met-selec">
            <el-select
              v-model="currySelect2"
              value-key="id"
              placeholder="选择数据类型"
              @change="selectChange"
              style="margin-right: 20px;"
            >
              <el-option
                v-for="node in selectData"
                :label="node.name"
                :key="node.id"
                :value="node.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="currySelect3"
              value-key="id"
              placeholder="选择数据更新时间段"
              @change="selectChange"
            >
              <el-option
                v-for="node in selectData"
                :label="node.name"
                :key="node.id"
                :value="node.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="charts" ref="midLeft"></div>
      </div>
      <div class="bgdsm mid-inner fr">
        <div class="home-title">
          <h3>数据访问热度</h3>
          <div class="met-selec">
            <el-select
              v-model="currySelect4"
              value-key="id"
              placeholder="选择访问时间"
              @change="selectChange"
            >
              <el-option
                v-for="node in selectData"
                :label="node.name"
                :key="node.id"
                :value="node.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="charts" ref="midRight"></div>
      </div>
    </div>
    <div class="pages foot">
      <div class="bgdsm foot-inner">
        <div class="home-title">
          <h3>数据库利用率</h3>
        </div>
        <div class="charts" ref="footLeft"></div>
      </div>
      <div class="bgdsm foot-inner fr">
        <div class="home-title">
          <h3>登录日志</h3>
          <button class="SeeMore" @click="pushLog">查看更多</button>
        </div>
        <div class="charts table">
          <el-table :data="logData" stripe style="width: 100%;" height="100%">
            <el-table-column prop="orderNum" label="日志序号" width="80"></el-table-column>
            <el-table-column prop="loadTime" label="发生时间"></el-table-column>
            <el-table-column prop="userName" label="用户"></el-table-column>
            <el-table-column prop="loadIp" label="登录IP"></el-table-column>
            <el-table-column prop="remarks" label="日志详情"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getcategory } from "@/api/ConfigurationManagement/MetadataCoding.js";
import { getCountByCateLogId, ioLogTopHundred } from "@/api/home/home.js";

export default {
  data() {
    return {
      selectData: [],
      currySelect: "",
      currySelect2: "",
      currySelect3: "",
      currySelect4: "",
      listData: [],
      logData: []
    };
  },
  mounted() {
    this.getSelect();
    this.createChart();
  },
  methods: {
    getSelect() {
      var _this = this;
      getcategory().then(res => {
        if (res.status == 200) {
          _this.selectData = res.data;
          _this.currySelect = res.data[0].id;
          _this.selectChange(_this.currySelect);
        }
      });

      ioLogTopHundred().then(res => {
        if (res.status == 200) {
          _this.logData = res.data;
          _this.logData.forEach((item, index) => {
            item.orderNum = ++index;
          });
        }
      });
    },
    selectChange(id) {
      var _this = this;
      getCountByCateLogId(id).then(res => {
        if (res.status == 200) {
          _this.listData = res.data;
        }
      });
    },
    createChart() {
      var chart1 = echarts.init(this.$refs.midLeft);
      var chart2 = echarts.init(this.$refs.midRight);
      var chart3 = echarts.init(this.$refs.footLeft);


      var dataIPSxAxis = ['04/20  ', '04/24', '04/27', '04/29 ', '05/02 ', '05/08'];
      var dataIPS = [20, 60, 50, 80, 120, 100];
      var dataIPS2 = [20, 70, 60, 80, 100, 90];

      chart1.setOption({
        // title: {
        //   text: "事件-告警联合态势",
        //   textStyle: {
        //     fontSize: 12,
        //     fontWeight: "normal",
        //     color: "#0674ca" //标题颜色
        //   },
        //   left: "2%"
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: [{name:'基础地理数据'},{name:'公共专题数据'}],
          textStyle: {
            color:function(a,b,c){}
          },
        },
        color: ["#0080ff", "#4cd5ce"],
        toolbox: {
          // feature: {
          //     saveAsImage: {}
          // }
        },
        grid: {
          left: "20",
          top: "20",
          right: "35",
          bottom: "10",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: dataIPSxAxis,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#6ba1bb",
                fontSize: 12
              },
              formatter: function(value) {
                //debugger
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = 5; //每项显示文字个数
                var valLength = value.length; //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于3,
                  for (var i = 0; i < rowN; i++) {
                    var temp = ""; //每次截取的字符串
                    var start = i * maxLength; //开始截取的位置
                    var end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              }
            },
            axisLine: {
              lineStyle: {
                color: "#0a2b52",
                width: 0.5 //这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#0a2b52",
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              formatter: function(val) {
                return val + "万";
              },
              show: true,
              textStyle: {
                color: "#6ba1bb" //字体颜色
              }
            },
            splitLine: {
              //保留网格线
              show: true,
              lineStyle: {
                //y轴网格线设置
                color: "#0a2b52",
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        series: [
          {
            name: "基础地理数据",
            type: "line",
            smooth: true,
            symbol: "none", //去掉折线点
            stack: 100,
            itemStyle: {
              normal: {
                color: '#32A795',
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: "solid",
                  color: "#0B8AC1"
                }
              },
              emphasis: {
                color: "#02675f",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: "dotted",
                  color: "#02675f" //折线的颜色
                }
              }
            }, //线条样式
            symbolSize: 5, //折线点的大小
            areaStyle: {
              normal: {}
            },
            data: dataIPS
          },

          {
            name: "公共专题数据",
            type: "line",
            smooth: true,
            symbol: "none", //去掉折线点
            stack: 100,
            itemStyle: {
              normal: {
                color: '#0B8AC1',
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: "solid",
                  color: "#02675f"
                }
              },
              emphasis: {
                color: "#02675f",
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 0.5,
                  type: "dotted",
                  color: "#02675f" //折线的颜色
                }
              }
            }, //线条样式
            symbolSize: 5, //折线点的大小
            areaStyle: {
              normal: {}
            },
            data: dataIPS2
          }
        ]
      });

      var myColor = [
        "#eb2100",
        "#eb3600",
        "#d0570e",
        "#d0a00e",
        "#34da62",
        "#00e9db",
        "#00c0e9",
        "#0096f3",
        "#33CCFF",
        "#33FFCC"
      ];

      chart2.setOption({
        grid: {
          left: "35",
          top: "20",
          right: "35",
          bottom: "10",
          containLabel: true
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: {
              show:false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
                show:false
            },
            data: ["", "", "", "", ""]
          },
          {
            axisTick: {
              show:false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
                show:false
            },
            data: []
          },
          {
            axisLine: {
                show: false
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [4, 13, 25, 29, 38],
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  color: "#ffffff",
                  fontSize: "10"
                }
              }
            },
            barWidth: 4,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99, 99.5, 99.5, 99.5, 99.5],
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#0e2147",
                barBorderRadius: 5
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100],
            barWidth: 12,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                barBorderRadius: 5
              }
            },
            z: 0
          },
          {
            name: "外圆",
            type: "scatter",
            hoverAnimation: false,
            data: [0, 0, 0, 0, 0],
            yAxisIndex: 2,
            symbolSize: 16,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                opacity: 1
              }
            },
            z: 2
          }
        ]
      });

      chart3.setOption({
        title: {
          text: "84%",
          subtext: "PG数据库使用率",
          x: "center",
          y: "center",
          textStyle: {
            color: "#fff",
            fontSize: 30,
            fontWeight: "normal"
          },
          subtextStyle: {
            color: "#14A7ED",
            fontSize: 14,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: [65, 85],
            center: ["50%", "50%"],
            data: [
              {
                value: 34,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#f6e3a1"
                    },
                    {
                      offset: 1,
                      color: "#ff4236"
                    }
                  ])
                },
                label: {
                  color: "#0A9FD4",
                  fontSize: 14,
                  formatter: "已使用\n{a|34}%",
                  rich: {
                    a: {
                      color: "#0A9FD4",
                      fontSize: 14
                    }
                  }
                }
              },
              {
                value: 52,
                itemStyle: {
                  color: "transparent"
                }
              }
            ]
          },
          {
            type: "pie",
            radius: [70, 80],
            center: ["50%", "50%"],
            data: [
              {
                value: 34,
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: 52,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#348fe6"
                    },
                    {
                      offset: 1,
                      color: "#625bef"
                    }
                  ])
                },
                label: {
                  color: "#0A9FD4",
                  fontSize: 14,
                  formatter: "剩余\n{a|52}%",
                  rich: {
                    a: {
                      color: "#0A9FD4",
                      fontSize: 14
                    }
                  }
                }
              }
            ]
          }
        ]
      });

      window.onresize = function() {
        chart1.resize();
        chart2.resize();
        chart3.resize();
      };
    },
    pushLog() {
      this.$router.push("DataOperationLog");
    }
  }
};
</script>

<style lang="scss">
#myhome {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.3rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-size: 0.16rem;

  .home-title {
    h3 {
      margin: 0;
      padding: 0.1rem 1rem;
      display: inline-block;
      color: #0a9fd4;
      font-size: 0.16rem;
    }

    .SeeMore {
      float: right;
      cursor: pointer;
      height: 32px;
      padding: 0 0.1rem;
      border-radius: 4px;
      outline: none;
      background-color: #042453;
      border: none;
      color: #0a9fd4;
    }

    .met-selec {
      display: block;
      float: right;

      .el-input__inner {
        background-color: #042453;
        color: #fff;
        outline: 0;
        border-color: #042453;
      }
    }
  }

  .home-list {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 0.41rem);
    padding: 0.1rem 0 0.1rem 0.2rem;

    ul {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: hidden auto;

      li {
        cursor: pointer;
        display: inline-block;
        padding: 0.12rem 0.2rem;
        overflow: hidden;
      }

      .list-wrap {
        text-align: center;

        .list-title {
          font-size: 0.14rem;
          color: #0a9fd4;
          max-width: 1.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span {
          display: block;
        }

        .list-img-wrap {
          width: 1rem;
          height: 1rem;
          margin: 0.1rem 0.1rem;
          position: relative;

          @keyframes warn {
              0% {
                transform: scale(0.75);
              }
              10% {
                transform: scale(0.75);
              }
              20% {
                transform: scale(0.75);
              }
              30% {
                transform: scale(0.75);
              }
              40% {
                transform: scale(0.75);
              }
              50% {
                transform: scale(0.75);
              }
              60% {
                transform: scale(0.8);
              }
              70% {
                transform: scale(0.85);
              }
              80% {
                transform: scale(0.9);
              }
              90% {
                transform: scale(0.95);
              }
              100% {
                transform: scale(1);
              }
          }

          .list-bg {
            width: 1rem;
            height: 1rem;
            position: absolute;
            z-index: 0;
            left: 0;
            top:0;
            border-radius: 50%;
            background: url("../../assets/MetadataCoding/ty.png") no-repeat center;
            background-size: 100% 100%;
            animation: warn 2s linear 0s infinite;
          }

          .list-bg2 {
            width: 1rem;
            height: 1rem;
            position: absolute;
            z-index: 0;
            left: 0;
            top:0;
            border-radius: 50%;
            background: url("../../assets/MetadataCoding/ty.png") no-repeat center;
            background-size: 100% 100%;
            animation: warn 2s linear 1.5s infinite;
          }

          .list-img {
            position: absolute;
            left:0.125rem;
            top: 0.125rem;
            width: 0.75rem;
            height: 0.75rem;
            background: url("../../assets/MetadataCoding/r.png") no-repeat center;
            background-size: 100% 100%;
          }

        }

        .list-count {
          color: #0a9fd4;
          font-size: 0.24rem;
        }
      }
    }
  }

  .page {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 2.56rem;
    margin-bottom: 20px;
  }

  .pages {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 3.08rem;
    margin-bottom: 20px;
  }

  .charts {
    width: 100%;
    height: calc(100% - 0.41rem);
  }

  .bgd {
    background: url("../../assets/DataManagement/home-bg.png") no-repeat center;
    background-size: 100% 100%;
  }

  .bgdsm {
    background: url("../../assets/DataManagement/home-bg-sm.png") no-repeat center;
    background-size: 100% 100%;
  }

  .foot {
    margin-bottom: 0;
  }

  .foot,
  .mid {
    .fr {
      float: right;
    }

    .foot-inner,
    .mid-inner {
      display: inline-block;
      width: 49.5%;
      height: 100%;
    }
  }

  .table {
    box-sizing: border-box;
    padding: 0.2rem 0.2rem;

    .el-table__empty-block {
      height: auto;
    }

    .el-table .cell {
      text-align: center;
    }

    .el-table td,
    .el-table th.is-leaf {
      border: none;
    }

    .el-table,
    .el-table__expanded-cell {
      background-color: transparent;
    }

    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background: transparent;
    }

    .el-table {
      color: #0a9fd4;
      font-size: 0.14rem;
      .el-table__row--striped {
        background-color: #02153d;
      }

      .el-checkbox__inner {
        border: 1px solid #032b68;
        background-color: transparent;

        &::after {
          border-color: #0ca8e3;
        }
      }
    }

    .el-table__row {
      td {
        text-align: center;
      }
    }

    // 表头
    .has-gutter {
      font-size: 0.14rem;
      color: #0a9fd4;
      background-color: #031a46;
    }

    .el-table th,
    .el-table tr {
      background-color: transparent;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #194e7a;
    }

    .el-table .sort-caret.ascending {
      border-bottom-color: #0a9fd4;
    }

    .el-table .sort-caret.descending {
      border-top-color: #0a9fd4;
    }

    .el-table .ascending .sort-caret.ascending {
      border-bottom-color: #0bd9f5;
    }

    .el-table .descending .sort-caret.descending {
      border-top-color: #0bd9f5;
    }
  }
}
</style>
