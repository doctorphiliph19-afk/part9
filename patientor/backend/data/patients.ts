import type { Patient } from "../src/types.ts";

const patients: Patient[] = [
	{
		id: "1",
		name: "John McClane",
		dateOfBirth: "1986-07-09",
		ssn: "090786-122X",
		gender: "male",
		occupation: "New york city cop",
		entries: [
			{
				id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
				date: "2015-01-02",
				type: "Hospital",
				specialist: "MD House",
				diagnosisCodes: ["S62.5"],
				description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
				discharge: {
					date: "2015-01-16",
					criteria: "Thumb has healed.",
				},
			},
		],
	},
	{
		id: "2",
		name: "Martin Riggs",
		dateOfBirth: "1979-01-02",
		ssn: "020179-123Y",
		gender: "male",
		occupation: "Cop",
		entries: [],
	},
];

export default patients;
