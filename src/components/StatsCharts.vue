<template>
	<div id="main" ref="containerRef" style="width: 600px; height: 600px"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import * as echarts from "echarts";
import type { Stat } from "@/type/Stat";
type EChartsOption = echarts.EChartsOption;
const containerRef = ref();
// series数据
const chartData: Array<Stat> = [
	{ name: "张三", value: 3223 },
	{ name: "李四", value: 2456 },
	{ name: "王五", value: 1892 },
	{ name: "赵六", value: 3567 },
	{ name: "钱七", value: 4123 },
	{ name: "孙八", value: 2789 },
	{ name: "周九", value: 3310 },
	{ name: "吴十", value: 1998 },
	{ name: "郑十一", value: 2875 },
	{ name: "233", value: 3652 },
	{ name: "32", value: 3652 },
	{ name: "234", value: 3652 },
];
// legend数据
const chartDataLegned = computed(() => {
	if (chartData) {
		return chartData.map((item) => item.name);
	} else {
		return [];
	}
});
// 渲染图表
onMounted(() => {
	const chartDom = containerRef.value;
	const myChart = echarts.init(chartDom);
	option && myChart.setOption(option);
});
// echarts配置项
const option: EChartsOption = {
	title: {
		text: "图表统计",
		left: "center",
	},
	tooltip: {
		trigger: "item",
		formatter: "{a} <br/>{b} : {c} ({d}%)",
	},
	legend: {
		type: "scroll",
		orient: "vertical",
		right: 10,
		top: 20,
		bottom: 20,
		data: chartDataLegned.value,
	},
	series: [
		{
			name: "名称",
			type: "pie",
			radius: "55%",
			center: ["40%", "50%"],
			data: chartData,
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)",
				},
			},
		},
	],
};
</script>

<style scoped></style>
