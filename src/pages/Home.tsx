"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    useAccount,
    useReadContract,
} from "wagmi";
import { Github, Instagram, Linkedin, LoaderIcon } from "lucide-react";
import Image from "next/image";
import TipForm from "@/components/fragments/tip-form";
import GoalCard from "@/components/fragments/goal-card";
import { formatEther, Log } from "viem";
import { contractData } from "../../contract/contract";
import TipMarquee from "@/components/fragments/tip-marquee";

const Homepage = () => {
    const { isConnected, address: accountAddress } = useAccount();

    // goal value
    const {
        data: currentGoal,
        isPending: isCurrentGoalPending,
        error: currentGoalError,
    } = useReadContract({
        address: contractData.address as `0x${string}`,
        abi: contractData.abi,
        functionName: "currentGoal",
    });

    const {
        data: fundingGoalAmount,
        isPending: isFundingGoalAmountPending,
        error: fundingGoalAmountError,
    } = useReadContract({
        address: contractData.address as `0x${string}`,
        abi: contractData.abi,
        functionName: "fundingGoalAmount",
    });

    const {
        data: totalRaisedForCurrentGoal,
        isPending: isTotalRaisedForCurrentGoalPending,
        error: totalRaisedForCurrentGoalError,
    } = useReadContract({
        address: contractData.address as `0x${string}`,
        abi: contractData.abi,
        functionName: "totalRaisedForCurrentGoal",
    });

    const progress =
        ((totalRaisedForCurrentGoal ? parseFloat(totalRaisedForCurrentGoal as string) : 0) /
            (fundingGoalAmount ? parseFloat(fundingGoalAmount as string) : 1)) *
        100;

    const goalData = {
        currentGoal: currentGoal ? String(currentGoal) : "",
        fundingGoalAmount: fundingGoalAmount
            ? formatEther(BigInt(fundingGoalAmount as string))
            : "0",
        totalRaisedForCurrentGoal: totalRaisedForCurrentGoal
            ? formatEther(BigInt(totalRaisedForCurrentGoal as string))
            : "0",
        progress,
    };

    if (
        isCurrentGoalPending ||
        isFundingGoalAmountPending ||
        isTotalRaisedForCurrentGoalPending
    ) {
        return (
            <div className="flex items-center justify-center h-full">
                <LoaderIcon className="animate-spin mx-auto" />
            </div>
        );
    }

    return (
        <>
            <Card className="w-full max-w-5xl bg-secondary-background mx-auto">
                <CardContent className="flex justify-between items-start px-5">
                    <div className="flex items-center gap-5">
                        <Image
                            src="/foto.png"
                            alt="Logo"
                            width={70}
                            height={70}
                            className="rounded-full border-2 border-border shadow-shadow p-1"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">Nasywan Damar</h2>
                            <p className="text-sm">
                                Frontend Developer | Undergraduate Student | IT
                                Enthusiast
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        {/* Social link */}
                        <a
                            href="https://github.com/MastayY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-main transition-all duration-300"
                        >
                            <Github className="h-6 w-6" />
                        </a>
                        <a
                            href="https://instagram.com/nniceone._"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-main transition-all duration-300"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a
                            href="https://linkedin.com/in/nasywandf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-main transition-all duration-300"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                    </div>
                </CardContent>
            </Card>

            <TipMarquee />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                <div className="h-full grid">
                    <GoalCard goalData={goalData} />

                    <Card className="w-full max-w-5xl bg-secondary-background mx-auto mt-5">
                        <CardHeader>
                            <CardTitle>About Me</CardTitle>
                            <CardDescription>
                                Some description about me.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
                                Hello! I'm a frontend developer with a passion
                                for building beautiful and functional web
                                applications. My goal is to create seamless user
                                experiences and contribute to open-source
                                projects. Currently majoring in Bachelor of
                                Informatics.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <TipForm isConnected={isConnected} />
            </section>
        </>
    );
};

export default Homepage;
