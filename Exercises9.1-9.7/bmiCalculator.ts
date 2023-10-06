interface BmiValues {
    heightCM: number;
    weightKG: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightCM: Number(args[2]),
            weightKG: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = ({ heightCM, weightKG }: BmiValues): string => {

    const heightM = heightCM / 100;
    const bmi = weightKG / (heightM * heightM);

    let message;
    if (bmi < 18.5) {
        message = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        message = 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        message = 'Overweight';
    } else {
        message = 'Obese';
    }

    return `With a height of ${heightCM}cm and weight of ${weightKG}kg, your BMI is ${bmi.toFixed(2)} (${message}).`;
};

try {
    const { heightCM, weightKG } = parseArguments(process.argv);
    const bmiResult = calculateBmi({ heightCM: heightCM, weightKG: weightKG });
    console.log(bmiResult);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi;