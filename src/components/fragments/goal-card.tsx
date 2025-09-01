import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatEther } from "viem";

interface GoalCardPropsTypes {
    goalData: {
        currentGoal: string;
        fundingGoalAmount: string;
        totalRaisedForCurrentGoal: string;
        progress: number;
    };
}

const GoalCard = (props: GoalCardPropsTypes) => {
    const { goalData } = props;

    return (
        <Card className="w-full max-w-5xl bg-secondary-background mx-auto">
            <CardHeader>
                <CardTitle>{goalData.currentGoal as string}</CardTitle>
            </CardHeader>
            <CardContent>
                <Progress
                    value={parseFloat(goalData.totalRaisedForCurrentGoal as string)}
                    max={parseFloat(goalData.fundingGoalAmount as string)}
                />
                <p className="text-sm mt-2">
                    <strong>{goalData.progress.toFixed(2)}%</strong> of{" "}
                    {goalData.fundingGoalAmount} ETH
                </p>
                <p className="text-sm mt-4">
                    Every fund you contribute will help me achieve my goal. So
                    thank you for your support!
                </p>
            </CardContent>
        </Card>
    );
};

export default GoalCard;
