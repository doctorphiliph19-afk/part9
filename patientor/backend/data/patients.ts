import type { Patient } from "../src/types.ts";

const patients: Patient[] = [
	{
		id: "1",
		name: "John McClane",
		dateOfBirth: "1986-07-09",
		ssn: "090786-122X",
		gender: "male",
		occupation: "New york city cop",
	},
	{
		id: "2",
		name: "Martin Riggs",
		dateOfBirth: "1979-01-02",
		ssn: "020179-123Y",
		gender: "male",
		occupation: "Cop",
	},
];

export default patients;
