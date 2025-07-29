<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type Ref } from "vue";
import type { Stat, StatData } from "@/type/Stat";
import StatTable from "@/components/StatTable.vue";
import ClipboardInput from "@/components/ClipboardInput.vue";
import type { AddResultType } from "@/type/AddResultType";
import StatsCharts from "@/components/StatsCharts.vue";
import { useStatDataStore } from "@/stores/StatData";
import type { ElInput } from "element-plus";

const useStat = useStatDataStore();
const useStatId: Ref<number> = ref(useStat.storageDataListId!);
const useStatDataList: Ref<Array<StatData>> = computed(
	() => useStat.storageDataList!,
);
const useStatData: Ref<StatData> = computed(() => {
	return useStatDataList.value.find((item) => item.id === +useStatId.value)!;
});
const dataList: Ref<Array<Stat>> = computed(() => useStatData.value?.stat!);
const isAlterStatName = ref(false);
const alterStatNameInput = ref<InstanceType<typeof ElInput>>();
const alterStatNameInputValue = ref("");
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
function addNewStatData() {
	useStatId.value = useStat.newstorageData();
}
function dleeteStatData() {
	useStatDataList.value.splice(
		useStatDataList.value.findIndex((item) => item.id === +useStatId.value),
		1,
	);
	if (useStatDataList.value.length > 0) {
		useStatId.value =
			useStatDataList.value[useStatDataList.value.length].id;
	} else {
		addNewStatData();
	}
}
function dblclickStatName() {
	isAlterStatName.value = true;
	alterStatNameInputValue.value = useStatData.value.name;
	nextTick(() => {
		alterStatNameInput.value?.focus();
		alterStatNameInput.value?.select();
	});
}
function alterStatName() {
	alterStatNameInputValue.value = alterStatNameInputValue.value.trim();
	if (alterStatNameInputValue.value === "") {
		ElMessage.error("名称不能为空");
		return;
	} else if (
		useStatDataList.value.findIndex(
			(item) => item.name === alterStatNameInputValue.value,
		) >= 0
	) {
		let i = 1;
		while (
			useStatDataList.value.findIndex(
				(item) =>
					item.name === `${alterStatNameInputValue.value}(${i})`,
			) >= 0
		) {
			i++;
		}
		alterStatNameInputValue.value = `${alterStatNameInputValue.value}(${i})`;
	}
	isAlterStatName.value = false;
	useStatData.value.name = alterStatNameInputValue.value;
	alterStatNameInputValue.value = "";
	ElMessage.success("修改成功");
}
watch(useStatId, () => {
	useStat.storageDataListId = useStatId.value;
});
</script>

<template>
	<div>
		<div class="flex p-2">
			<ClipboardInput class="flex-1" :addDataList="addDataList" />
			<div class="flex flex-1 select-none items-center">
				<el-input
					ref="alterStatNameInput"
					v-if="isAlterStatName"
					v-model="alterStatNameInputValue"
					placeholder="统计名称"
					class="min-w-[5%] max-w-[30%]"
					@blur=""
					@keydown.enter.native="alterStatName"
				/>
				<el-tooltip
					v-else
					content="双击更改统计名称"
					placement="bottom"
					effect="light"
				>
					<p @dblclick="dblclickStatName">
						{{ useStatData!.name }}
					</p>
				</el-tooltip>

				<el-select
					class="w-[40%]! mx-2"
					v-model="useStatId"
					placeholder="Select"
				>
					<el-option
						v-for="statData in useStatDataList"
						:key="statData.id"
						:label="statData.name"
						:value="statData.id"
						:disabled="statData.id === useStatData.id"
					/>
				</el-select>
				<el-button plain @click="addNewStatData">添加新统计</el-button>
				<el-button type="danger" plain @click="dleeteStatData"
					>删除统计</el-button
				>
			</div>
		</div>
		<div class="mt-4 flex overflow-x-auto">
			<StatTable :tableData="dataList" :deleteStat="deleteStat" />
			<StatsCharts :chartData="dataList" />
		</div>
	</div>
</template>
<style></style>
