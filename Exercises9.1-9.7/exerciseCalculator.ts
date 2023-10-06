interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    dailyHours: number[],
    targetHours: number
): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((hours) => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= targetHours;

    let rating = 1;
    let ratingDescription = 'not too bad but could be better';

    if (success) {
        rating = 3;
        ratingDescription = 'great job, you reached your target!';
    } else if (average >= targetHours / 2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHours,
        average,
    };
};

const parseArguments = (args: string[]): [number, number[]] | null => {
    if (args.length < 2) {
        return null;
    }

    const targetHours = Number(args[0]);
    const dailyHours = args.slice(1).map(Number);

    if (!Number.isNaN(targetHours) && dailyHours.every(Number.isFinite)) {
        return [targetHours, dailyHours];
    }

    return null;
};

try {
    const args = process.argv.slice(2);
    const parsedArgs = parseArguments(args);
    if (parsedArgs) {
        const [targetHours, dailyHours] = parsedArgs;
        const result = calculateExercises(dailyHours, targetHours);
        console.log(result);
    } else {
        console.log('Invalid input. Please provide at least two valid numbers: target and daily exercise hours.');
    }
    // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;
