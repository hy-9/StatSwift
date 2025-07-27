<script setup lang="ts">
import ClipboardInput from "@/components/ClipboardInput.vue";
import StatsCharts from "@/components/StatsCharts.vue";
function addDataList() {
  return {
    result: false,
    message: "cuowu",
  };
}
</script>

<template>
  <div>
    <ClipboardInput :addDataList="addDataList" />
    <StatsCharts />
  </div>
</template>
<style></style>
