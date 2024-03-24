import { FC } from "react";
import { EnrichedAllocation } from "./interface";

const MachineTable: FC<{ allocations: EnrichedAllocation[] }> = ({ allocations }) => {

    const getTotalAllocation = (allocations: EnrichedAllocation[], received?: boolean): number => {
        return allocations.reduce((prev, cur) => {
            return prev + (received ? cur.received : cur.requested);
        }, 0);
    };
    
    return <div>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Locates</th>
                    <th>Allocations</th>
                </tr>
            </thead>
            <tbody>
                {
                    allocations.map(alloc => (
                        <tr key={`${name}-${alloc.symbol}`}>
                            <td>{alloc.symbol}</td>
                            <td>{alloc.requested}</td>
                            <td>{alloc.received}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div>
            <h5>Total allocations: {getTotalAllocation(allocations)}</h5>
            <h5>Recieved allocations: {getTotalAllocation(allocations, true)}</h5>
        </div>
    </div>
};

export default MachineTable;