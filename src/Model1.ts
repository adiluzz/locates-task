import MachineData from "./MachineData";
import { EnrichedAllocation } from "./interface";

export const getTotalLocates = (machines: MachineData[]) => {
    // Get all allocates as an array
    const allLocates = machines.reduce<EnrichedAllocation[]>((prev, cur) => {
        return prev.concat(cur.allocations);
    }, []);

    // aggregate allocates
    const returnData: { [key: string]: EnrichedAllocation } = {};
    for (let i = 0; i < allLocates.length; i++) {
        const oneAllocation = allLocates[i];
        if (returnData[allLocates[i].symbol]) {
            returnData[allLocates[i].symbol].received += oneAllocation.received;
            returnData[allLocates[i].symbol].requested += oneAllocation.requested;
        } else {
            returnData[allLocates[i].symbol] = oneAllocation;
        }
    }
    return returnData;
};

export const redistributeAllcations = (machines: MachineData[]) => {
    const returnData: MachineData[] = [];
    const totals = getTotalLocates(machines);

    // for each symbol, allocate a 
    for (let i = 0; i < machines.length; i++) {
        const machine = new MachineData(machines[i].name, {});
        for (const symbol in totals) {
            if (Object.prototype.hasOwnProperty.call(totals, symbol)) {
                const oneTotal = totals[symbol];
                machine.allocations.push({
                    symbol, 
                    requested: oneTotal.requested / machines.length, 
                    received: 0
                });
            }
        }
        returnData.push(machine);
    }
    return returnData;
};


export const suggestAllocationsModel1 = (machines: MachineData[]) => {
    const oldMachines = [...machines];

    // Reduce results to an object per machine name
    const suggested = redistributeAllcations(machines)
        .reduce<{ [key: string]: MachineData }>((prev, cur) => {
            prev[cur.name] = cur;
            return prev;
        }, {});

    // Add suggested to each machine
    for (let i = 0; i < oldMachines.length; i++) {
        oldMachines[i].suggested = suggested[oldMachines[i].name].allocations;
    }
    return oldMachines;
};
