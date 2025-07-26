<script setup lang="ts">
import ClipboardInput from "@/components/ClipboardInput.vue";

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
  </div>
</template>
<style></style>
