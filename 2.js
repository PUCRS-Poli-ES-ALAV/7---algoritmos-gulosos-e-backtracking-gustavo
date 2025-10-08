const intervals = [
	[4, 8],
	[6, 7],
	[13, 14],
	[4, 5],
	[2, 4],
	[6, 9],
	[7, 10],
	[9, 11],
	[1, 6],
	[3, 13],
	[9, 12],
];

const output = [
    [2, 4],
    [6, 7],
    [9, 11],
    [13, 14],
]

const serializeOutput = (array) => {
    return array.map((_) => _.join('_')).join(',')
}

const sdm = (intervals) => {
	const sortedIntervals = [...intervals].sort((a, b) => {
		return a[1] - b[1];
	});

	const selectedIntervals = [];

	for (const [s, f] of sortedIntervals) {
		if (selectedIntervals.length === 0) {
			selectedIntervals.push([s, f]);
			continue;
		}

		const [, lf] = selectedIntervals[selectedIntervals.length - 1];

		if (s > lf) {
			selectedIntervals.push([s, f]);
		}
	}

    return selectedIntervals;
};

sdm(intervals);
