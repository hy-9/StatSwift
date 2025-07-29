import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type { Stat, StatData } from "@/type/Stat";

export const useStatDataStore = defineStore("statData", () => {
	const storageDataListId = ref<number>();
	const storageDataList = ref<Array<StatData>>([]);
	function getStorageData() {
		const data = localStorage.getItem("statData");
		if (data) {
			storageDataList.value = JSON.parse(data);
		}
	}
	function saveStorageData() {
		localStorage.setItem("statData", JSON.stringify(storageDataList.value));
	}
	/**
	 * 新建统计数据
	 * @returns {number} 新统计数据的id
	 */
	function newstorageData(): number {
		const newStatData: StatData = {
			id: Date.now(),
			name: "新统计",
			stat: new Array<Stat>(),
		};
		if (
			storageDataList.value.findIndex(
				(item) => item.name === newStatData.name,
			) >= 0
		) {
			let i = 1;
			while (
				storageDataList.value.findIndex(
					(item) => item.name === `${newStatData.name}(${i})`,
				) >= 0
			) {
				i++;
			}
			newStatData.name = `${newStatData.name}(${i})`;
		}
		storageDataList.value.push(newStatData);
		ElMessage.success("新建 " + newStatData.name + " 成功");
		return newStatData.id;
	}
	watch(
		storageDataList,
		() => {
			saveStorageData();
		},
		{ deep: true },
	);
	(() => {
		getStorageData();
		if (storageDataList.value.length === 0) {
			newstorageData();
		}
		storageDataListId.value =
			storageDataList.value[storageDataList.value.length - 1].id;
	})();

	return {
		storageDataListId,
		storageDataList,
		getStorageData,
		saveStorageData,
		newstorageData,
	};
});
