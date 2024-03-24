import { FC } from "react";
import MachineData from "./MachineData";
import MachineTable from "./MachineTable";
import { MachineTablesWrapper } from "./components";

const Machine: FC<MachineData> = ({ name, allocations, suggested }) => {
    return <div>
        <h3>{name}</h3>
        <MachineTablesWrapper>
            <MachineTable allocations={allocations} />
            {
                suggested && <MachineTable allocations={suggested} />
            }
        </MachineTablesWrapper>
    </div>
};

export default Machine;