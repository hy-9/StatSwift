<template>
	<div
		id="main"
		ref="containerRef"
		class="h-[calc(100vh-20vh)] w-[calc(100vw-40vw)]"
	></div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import type { ChartType, Stat } from "@/type/Stat";
import { utils, writeFileXLSX } from "xlsx";
type EChartsOption = echarts.EChartsOption;

const props = withDefaults(
	defineProps<{
		chartData: Stat[];
	}>(),
	{
		chartData: () => [] as Stat[],
	},
);
// series数据
const chartData = computed(() => props.chartData);
const containerRef = ref();
const chartType = ref<ChartType>("pie");
let myChart: echarts.ECharts;

function rendererChart() {
	const option: EChartsOption = {
		title: {
			text: "图表统计",
			left: "center",
		},
		tooltip: {
			trigger: "item",
			formatter: computed(() => {
				if (chartType.value == "pie") {
					("{a} <br/>{b} : {c} ({d}%)");
				} else {
					return "{a} <br/>{b} : {c} ";
				}
			}).value,
			show: true,
		},
		toolbox: {
			feature: {
				dataView: { readOnly: true },
				myToolMagicPie: {
					show: true,
					title: "切换为饼图",
					icon: "path://M512 98.304C282.624 98.304 98.304 282.624 98.304 512s184.32 413.696 413.696 413.696c229.376 0 413.696-184.32 413.696-413.696S741.376 98.304 512 98.304zM888.832 491.52l-331.776 0 233.472-233.472C847.872 323.584 884.736 401.408 888.832 491.52zM512 888.832c-208.896 0-376.832-167.936-376.832-376.832 0-208.896 167.936-376.832 376.832-376.832 98.304 0 184.32 36.864 253.952 98.304l-266.24 266.24c-4.096 4.096-4.096 8.192-4.096 12.288 0 12.288 8.192 20.48 20.48 20.48l376.832 0C876.544 729.088 712.704 888.832 512 888.832z",
					onclick: function () {
						chartType.value = "pie";
					},
				},
				myToolMagicBar: {
					show: true,
					title: "切换为柱状图",
					icon: "path://M512 752.16a32 32 0 0 1-32-32V350.624a32 32 0 0 1 64 0v369.536a32 32 0 0 1-32 32zM320 752.576a32 32 0 0 1-32-32V512a32 32 0 0 1 64 0v208.576a32 32 0 0 1-32 32zM896 752.672a32 32 0 0 1-32-32V163.488a32 32 0 1 1 64 0v557.184a32 32 0 0 1-32 32zM704 752.736a32 32 0 0 1-32-32V224a32 32 0 1 1 64 0v496.736a32 32 0 0 1-32 32z",
					onclick: function () {
						chartType.value = "bar";
					},
				},
				myToolExportExcel: {
					show: true,
					title: "导出为表格",
					icon: "path://M96 160v704h832V160H96z m309.344 400.192v-160h192v160h-192z m192 64V800h-192v-175.808h192zM160 400.192h181.344v160H160v-160z m501.344 0H864v160h-202.656v-160zM864 224v112.192H160V224h704zM160 624.192h181.344V800H160v-175.808zM661.344 800v-175.808H864V800h-202.656z",
					onclick: function () {
						exportFile();
					},
				},
				saveAsImage: {},
			},
		},
		legend: {
			type: "scroll",
			orient: "vertical",
			left: 10,
			top: 20,
			bottom: 20,
			data: chartData.value.map((item) => item.name),
		},
		xAxis: {
			show: chartType.value == "bar",
			data: chartData.value.map((item) => item.name),
		},
		yAxis: {
			max: Math.max(...chartData.value.map((item) => item.value)) + 1,
			minInterval: 1,
			show: chartType.value == "bar",
		},
	};
	switch (chartType.value) {
		case "pie":
			option.series = {
				name: "名称",
				type: "pie",
				radius: "55%",
				center: ["40%", "50%"],
				data: chartData.value,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			};
			break;
		case "bar":
			option.series = {
				name: "图表统计",
				type: "bar",
				data: chartData.value,
			};
			break;
		default:
			break;
	}
	myChart && myChart.setOption(option);
}
watch(
	[chartData, chartType],
	() => {
		rendererChart();
	},
	{ deep: true },
);
//窗口缩放时
window.addEventListener("resize", function () {
	myChart.resize();
});
// 渲染图表
onMounted(() => {
	myChart = echarts.init(containerRef.value);
	rendererChart();
});
// 导出为excel
function exportFile() {
	/* generate worksheet from state */
	const sheetData = chartData.value.map((item) => {
		return { 名称: item.name, 次数: item.value };
	});
	const ws = utils.json_to_sheet(sheetData);
	/* create workbook and append worksheet */
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, "Data");
	/* export to XLSX */
	writeFileXLSX(wb, "统计数据.xlsx");
}
</script>

<style scoped></style>
