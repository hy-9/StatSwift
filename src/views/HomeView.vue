<script setup lang="ts">
import fetchTool from "@/request/fetchTool";
import type { dome } from "@/type/dome";
import { ref } from "vue";

const dome = ref<dome>();
async function login() {
	try {
		let res = await fetchTool.request<dome>({
			method: "POST",
			url: "/user/login",
		});
		console.log(res);
	} catch (error) {
		console.log(error);
		ElMessage.error("error");
	}
}

login();
</script>

<template>
	<div
		class="m-4 mx-auto flex max-h-40 max-w-80 items-center bg-white p-6 shadow-lg"
	>
		<div class="shrink-0">
			<img
				class="size-12"
				src="..\..\public\favicon.ico"
				alt="ChitChat Logo"
			/>
		</div>
		<div>
			<div class="text-xl text-black">ChitChat</div>
			<p class="text-slate-500">
				<el-icon><Select /></el-icon>You have a new message!
			</p>
		</div>
	</div>
</template>
<style></style>
