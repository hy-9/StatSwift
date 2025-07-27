<script setup lang="ts">
import type { Stat } from "@/type/Stat";

const props = withDefaults(
	defineProps<{
		tableData: Stat[];
		deleteStat: (stat: Stat) => Boolean;
	}>(),
	{
		tableData: () => [] as Stat[],
		deleteStat: () => () => false,
	},
);

const tableOptions = [
	{ label: "序号", prop: "index" },
	{ label: "名称", prop: "name" },
	{
		label: "次数",
		prop: "value",
		formatter: (row: Stat) => row.value.toString() + " 次",
	},
];

function clickDeleteStatBt(which: Stat) {
	props.deleteStat(which)
		? ElMessage.success("删除成功")
		: ElMessage.error("删除失败");
}
</script>

<template>
	<el-table
		:data="tableData"
		border
		:fit="false"
		show-summary
		flexible
		class="w-1/2"
	>
		<el-table-column
			v-for="(option, index) in tableOptions"
			:key="index"
			:prop="option.prop"
			:label="option.label"
			:formatter="option.formatter"
		/>
		<el-table-column label="操作"
			><template #default="scope"
				><el-button
					type="danger"
					plain
					size="small"
					@click="clickDeleteStatBt(scope.row)"
					>删除</el-button
				></template
			></el-table-column
		>
	</el-table>
</template>

<style scoped></style>
