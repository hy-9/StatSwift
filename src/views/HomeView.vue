<script setup lang="ts">
import { ref } from "vue";
import type { Stat } from "@/type/Stat";
import StatTable from "@/components/StatTable.vue";
import ClipboardInput from "@/components/ClipboardInput.vue";
import type { AddResultType } from "@/type/AddResultType";
import StatsCharts from "@/components/StatsCharts.vue";

const dataList = ref<Array<Stat>>([]);
function addDataList(payload: string) {
	let result: AddResultType = {
		result: false,
		message: "",
	};
	if (payload.trim() === "") {
		result.message = "内容不能为空";
	} else {
		result.result = true;
		let index = dataList.value.findIndex(
			(item) => item.name === payload.trim(),
		);
		if (index >= 0) {
			dataList.value[index].value++;
			result.message = payload.trim() + " +1";
		} else {
			const newData = {
				name: payload.trim(),
				value: 1,
			};
			dataList.value.push(newData);
			result.message = "添加 " + payload.trim() + " 成功";
		}
	}
	return result;
}
function deleteStat(stat: Stat) {
	console.log("deleteStat", stat);

	let result = false;
	const index = dataList.value.findIndex((item) => item.name === stat.name);
	if (index >= 0) {
		dataList.value.splice(index, 1);
		result = true;
	}
	return result;
}
</script>

<template>
	<div>
		<ClipboardInput :addDataList="addDataList" />
		<div class="mt-4 flex overflow-x-auto">
			<StatTable :tableData="dataList" :deleteStat="deleteStat" />
			<div></div>
			<StatsCharts :chartData="dataList" />
		</div>
	</div>
</template>
<style></style>
