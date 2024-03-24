import { useEffect, useState } from 'react';
import { getSessionId, retrieveAllocationsData, retrieveLocatesFromBroker, submitResultsToSession } from './Actions';
import Machine from './Machine';
import MachineData, { prepareDataToSubmit, setMachineData } from './MachineData';
import { suggestAllocationsModel1 } from './Model1';

const LocateRequests = () => {
	const [sessionId, setSessionId] = useState<number>();
	const [machines, setMachines] = useState<MachineData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initSessionId = async () => {
		const id = await getSessionId();
		setSessionId(id);
	}
	useEffect(() => {
		initSessionId();
	}, []);

	return (
		<div>
			<h1>Session ID: {sessionId}</h1>
			{
				sessionId &&
				<>
					<button onClick={async () => {
						setIsLoading(true);
						const response = await retrieveAllocationsData(sessionId);
						setMachines((setMachineData(response)));
						setIsLoading(false);
					}}
					>Retrieve Locate Requests</button>
					{
						machines.length > 0 &&
						<>
							<button onClick={async () => {
								setIsLoading(true);
								const newMachines = await retrieveLocatesFromBroker(machines, sessionId)
								setMachines(newMachines);
								setIsLoading(false);
							}}
							>Retrieve Locates From Broker for allocations</button>

							<button
								onClick={() =>
									setMachines(suggestAllocationsModel1(machines))
								}
							>Suggest allocations with model 1</button>

							<button
								onClick={async () => {
									setIsLoading(true);
									const newMachines = await retrieveLocatesFromBroker(machines, sessionId, true)
									setMachines(newMachines);
									setIsLoading(false);
								}}
							>
								Retrieve Locates From Broker For Sutggested</button>

							<button
								onClick={async () => {
									await submitResultsToSession(prepareDataToSubmit(machines), sessionId);
								}}
							>
								Submit Suggested
							</button>
						</>
					}
				</>
			}
			{
				isLoading &&
				<div>
					Loading
				</div>
			}
			{
				machines?.map(machine => (
					<Machine {...machine} key={machine.name} />
				))
			}
		</div>
	);
};

export default LocateRequests;
