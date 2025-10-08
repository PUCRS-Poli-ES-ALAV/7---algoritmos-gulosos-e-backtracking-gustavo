const coins = [100, 50, 25, 10, 5, 1];

const getPluralizedCent = (n) => (n > 1 ? "cents" : "cent");

/**
 * @param {number} value
 */
const calculateChange = (value) => {
	if (typeof value != "number") {
		throw new Error("Invalid input");
	}

	if (!value) {
		return "";
	}

	const valueInCents = (value * 1000) / 10;

	const coinSetup = new Map(coins.map((coin) => [coin, 0]));
	let totalChangeInCents = 0;

	for (let i = 0; i < coins.length; i++) {
		const remainingValue = valueInCents - totalChangeInCents;
		const coin = coins[i];

		if (remainingValue < coin) {
			continue;
		}

		const integralPart = Math.trunc(remainingValue / coin);

		if (integralPart > 0) {
			for (let j = 0; j < integralPart; j++) {
				const currentCount = coinSetup.get(coin);
				coinSetup.set(coin, 1 + currentCount);
			}
			totalChangeInCents += integralPart * coin;
		}
	}

	if (valueInCents - totalChangeInCents > 0) {
		throw new Error(
			`Invalid change for value=${value}. Max=${totalChangeInCents / 100}`
		);
	}

	const coinsSetupAsArray = Array.from(coinSetup.entries());

	return coinsSetupAsArray
		.filter(([_, count]) => !!count)
		.sort((a, b) => {
			return a[0] - b[0];
		})
		.map(([coin, count]) => {
			return `${coin} ${getPluralizedCent(coin)} (${count}x)`;
		})
		.join(" | ");
};

const testCases = [
	[
		2.89,
		"1 cent (4x) | 10 cents (1x) | 25 cents (1x) | 50 cents (1x) | 100 cents (2x)",
	],
	[2, "100 cents (2x)"],
	[0.04, "1 cent (4x)"],
	[0, ""],
	[5.1, "10 cents (1x) | 100 cents (5x)"],
	[100, "100 cents (100x)"],
];

for (const [value, expected] of testCases) {
	try {
		const v = calculateChange(value);

		if (v === expected) {
			console.log(`[✅ PASS] Test case for ${value}`);
		} else {
			console.log(
				`[❌ FAIL] Test case for ${value}. Received ${v}. Expected ${expected}`
			);
		}
	} catch (error) {
        console.log(error);
    }
}
