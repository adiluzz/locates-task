import { Button } from '@mui/material';
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
					<Button
						onClick={async () => {
							setIsLoading(true);
							const response = await retrieveAllocationsData(sessionId);
							setMachines((setMachineData(response)));
							setIsLoading(false);
						}}
						variant='contained'
					>
						Retrieve Locate Requests
					</Button>
					{
						machines.length > 0 &&
						<>
							<Button
								onClick={async () => {
									setIsLoading(true);
									const newMachines = await retrieveLocatesFromBroker(machines, sessionId)
									setMachines(newMachines);
									setIsLoading(false);
								}}
								variant='contained'
							>
								Retrieve Locates From Broker for allocations
							</Button>

							<Button
								onClick={() =>
									setMachines(suggestAllocationsModel1(machines))
								}
								variant='contained'
							>
								Suggest allocations with model 1
							</Button>

							<Button
								onClick={async () => {
									setIsLoading(true);
									const newMachines = await retrieveLocatesFromBroker(machines, sessionId, true)
									setMachines(newMachines);
									setIsLoading(false);
								}}
								variant='contained'
							>
								Retrieve Locates From Broker For Suggested</Button>

							<Button
								onClick={async () => {
									await submitResultsToSession(prepareDataToSubmit(machines), sessionId);
								}}
								variant='contained'
							>
								Submit Suggested
							</Button>
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
