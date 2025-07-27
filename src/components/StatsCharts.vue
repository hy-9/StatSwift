<template>
	<div
		id="main"
		ref="containerRef"
		class="h-[calc(100vh-20vh)] w-[calc(100vw-40vw)]"
	></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import type { Stat } from "@/type/Stat";
type EChartsOption = echarts.EChartsOption;

const props = defineProps<{ chartData: Array<Stat> }>();
// series数据
const chartData = computed(() => props.chartData).value;
const containerRef = ref();
let myChart: echarts.ECharts;
function rendererChart() {
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
			data: chartData.map((item) => item.name),
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
	myChart && myChart.setOption(option);
}
watch(chartData, () => {
	rendererChart();
});

// 渲染图表
onMounted(() => {
	myChart = echarts.init(containerRef.value);
	rendererChart();
});
</script>

<style scoped></style>
