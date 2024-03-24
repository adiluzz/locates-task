import axios from "axios";
import MachineData from "./MachineData";
import { EnrichedAllocation, Locates } from "./interface";

export const baseUrl = "https://9g7qfsq0qk.execute-api.us-east-1.amazonaws.com/v1/session";//"https://task.qspark.trade/v1/session";

export const submitResultsToSession = async (locates: Locates, sessionId: number) => {
    const request = await axios.put(`${baseUrl}/${sessionId}/locates`, locates);
    return request.data;
};
export const allocateLocates = async (symbol: string, quantity: number, sessionId: number): Promise<number> => {
    const data = await axios.post(`${baseUrl}/${sessionId}/broker?symbol=${symbol}&quantity=${quantity}`);
    return data.data.quantity;
};

export const getAllocationsData = async (allocations: EnrichedAllocation[], sessionId: number) => {
    for (let i = 0; i < allocations.length; i++) {
        allocations[i].received = await allocateLocates(allocations[i].symbol, allocations[i].requested, sessionId)
    }
};

export const retrieveAllocationsData = async (sessionId: number): Promise<Locates> => {
    const response = await axios.get<Locates>(`${baseUrl}/${sessionId}/locates`);
    return response.data;
};

export const getSessionId = async ()=>{
    return (await axios.post(baseUrl)).data;
};

export const retrieveLocatesFromBroker = async (machines: MachineData[], sessionId: number, getSuggested?: boolean) => {
    const newMachines: MachineData[] = [];
    for (let i = 0; i < machines.length; i++) {
        const allocations = getSuggested ? machines[i].suggested : machines[i].allocations;
        await getAllocationsData(allocations as EnrichedAllocation[], sessionId);
        newMachines.push({ ...machines[i] });
    }
    return newMachines;
};
