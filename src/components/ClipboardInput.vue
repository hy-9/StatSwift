<template>
	<div class="flex flex-nowrap">
		<el-input
			v-model="input"
			style="max-width: 240px"
			placeholder="请输入内容"
			ref="inputRef"
		/>
		<el-button type="primary" ref="buttonRef" @click="handleCommitButton"
			>提交</el-button
		>
	</div>
</template>

<script setup lang="ts">
import { ref, type Ref, defineProps, type PropType } from "vue";
import type { ElInput } from "element-plus";
import type { AddResultType } from "@/type/AddResultType";
const input: Ref = ref("");
const inputRef = ref<InstanceType<typeof ElInput>>();
let str: string = "";

const props = defineProps({
	addDataList: {
		type: Function as PropType<(payload: string) => AddResultType>,
		required: true,
	},
});

//处理props
function handleAddDataList(text: string): AddResultType {
	return props.addDataList(text);
}
//去除首尾空格
function formatInput(text: string): string {
	return text.trim();
}
// 页面不可见时取消所有焦点
window.document.onvisibilitychange = async () => {
	if (window.document.hidden) {
		// 让当前获得焦点的元素失去焦点
		if (document.activeElement) {
			(document.activeElement as HTMLElement).blur();
			console.log("刚刚失去焦点了");
		}
		// 取消文本选中
		if (window.getSelection) {
			window.getSelection()?.removeAllRanges();
		}
	}
};
//获取焦点时读取剪切板
window.addEventListener("focus", async () => {
	console.log("获得焦点了");
	try {
		str = await navigator.clipboard.readText();
		input.value = formatInput(str);
		setTimeout(() => {
			inputRef.value?.focus();
			inputRef.value?.select();
		}, 10);
	} catch (err) {
		console.error("无法读取剪切板:", err);
	}
	console.log();
});
//键盘事件
window.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		handleClipboard();
	}
});
//提交按钮
function handleCommitButton() {
	handleClipboard();
}
//处理剪切板
function handleClipboard() {
	const text = formatInput(input.value);
	const obj = handleAddDataList(text);
	// 处理剪切板内容
	if (obj.result) {
		input.value = "";
		ElMessage({
			message: obj.message,
			type: "success",
		});
	} else {
		input.value = text;
		ElMessage({
			message: obj.message,
			type: "error",
		});
	}
}
</script>

<style scoped></style>
