<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

console.log(import.meta.env);
</script>

<template>
	<div class="h-lvh w-lvw">
		<nav class="flex h-12 items-center">
			<RouterLink class="mx-2 hover:text-blue-500" to="/">
				Home
			</RouterLink>
			<RouterLink class="mx-2 hover:text-blue-500" to="/chart">
				Chart
			</RouterLink>
		</nav>
		<div
			class="h-[calc(100vh-(var(--spacing)*12))] overflow-x-auto overflow-y-auto"
		>
			<RouterView />
		</div>
	</div>
</template>

<style scoped></style>
