import { FC } from "react";
import MachineData from "./MachineData";
import MachineTable from "./MachineTable";

const Machine: FC<MachineData> = ({ name, allocations, suggested }) => {
    return <div>
        <h3>{name}</h3>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <MachineTable allocations={allocations} />
            {
                suggested && <MachineTable allocations={suggested} />
            }
        </div>
    </div>
};

export default Machine;