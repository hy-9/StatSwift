<script setup lang="ts">
import * as echarts from "echarts/core";
import { GridComponent, type GridComponentOption } from "echarts/components";
import { LineChart, type LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted } from "vue";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
	GridComponentOption | LineSeriesOption
>;
let chartDom: HTMLElement;
let myChart: echarts.ECharts;
let option: EChartsOption;

onMounted(() => {
	chartDom = document.getElementById("main")!;
	myChart = echarts.init(chartDom);
	option = {
		xAxis: {
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [150, 230, 224, 218, 135, 147, 260],
				type: "line",
			},
		],
	};

	option && myChart.setOption(option);

	window.addEventListener("resize", () => {
		myChart.resize();
	});
});
</script>

<template>
	<div id="main" class="h-full w-full"></div>
</template>

<style scoped></style>
