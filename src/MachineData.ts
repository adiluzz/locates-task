import { EnrichedAllocation, Locate, Locates } from "./interface";

export const prepareDataToSubmit = (machines: MachineData[]): Locates => {
    const returnData: Locates = machines.reduce<Locates>((prev, cur) => {
        if (cur.suggested) {
            prev[cur.name] = cur.suggested?.reduce<Locate>((prevAlloc, curAlloc) => {
                prevAlloc[curAlloc.symbol] = curAlloc.requested;
                return prevAlloc;
            }, {}) as Locate;
        }
        return prev;
    }, {});
    return returnData;
};

export const setMachineData = (locates: Locates) => {
    const enrichedLocates: MachineData[] = [];
    for (const machine in locates) {
        if (Object.prototype.hasOwnProperty.call(locates, machine)) {
            enrichedLocates.push(new MachineData(machine, locates[machine]))
        }
    }
    return enrichedLocates;
};

const enrichAllocations = (allocs: Locate) => {
    const allocations: EnrichedAllocation[] = [];
    for (const symbol in allocs) {
        if (Object.prototype.hasOwnProperty.call(allocs, symbol)) {
            allocations.push({
                requested: allocs[symbol],
                received: 0,
                symbol
            })
        }
    }
    return allocations;
};

export default class MachineData {
    allocations: EnrichedAllocation[];
    suggested?: EnrichedAllocation[];
    name: string;
    constructor(name: string, symbols: Locate) {
        this.allocations = enrichAllocations(symbols);
        this.name = name;
   }
}