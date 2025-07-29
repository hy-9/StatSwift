export type Stat = {
	name: string;
	value: number;
};
export type StatData = {
	id: number;
	name: string;
	stat: Array<Stat>;
};
export type ChartType = "pie" | "bar";
