"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { contractData } from "../../../contract/contract";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(50, {
            message: "Name must be at most 50 characters.",
        }),
    amount: z.coerce.number().positive({
        message: "Amount must be more than 0.",
    }),
    message: z
        .string()
        .min(2, {
            message: "Message must be at least 2 characters.",
        })
        .max(500, {
            message: "Message must be at most 500 characters.",
        }),
});

const TipForm = ({ isConnected }: { isConnected: boolean }) => {
    const {
        data: hash,
        error: isTxError,
        isPending: isTxPending,
        writeContract,
    } = useWriteContract();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as Resolver<
            z.infer<typeof formSchema>,
            any,
            z.infer<typeof formSchema>
        >,
        defaultValues: {
            name: "",
            amount: 0,
            message: "",
        },
    });

    // console.log("Form values:", form.getValues());

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        toast.promise(
            new Promise((resolve, reject) =>
                writeContract(
                    {
                        address: contractData.address as `0x${string}`,
                        abi: contractData.abi,
                        functionName: "addTip",
                        args: [values.name, values.message],
                        value: parseEther(values.amount.toString()),
                    },
                    {
                        onSuccess: (hash) => {
                            console.log("Transaction Successful, Hash:", hash);
                            resolve(hash);
                        },
                        onError: (error) => {
                            console.error("Transaction Error:", error);
                            reject(error);
                        },
                    }
                )
            ),
            {
                loading: "Transaction Pending...",
                success: (hash) => `Transaction Successful!\nHash: ${hash}`,
                error: (error) =>
                    `Transaction Error: ${error.shortMessage || error.message}`,
            }
        );
    };

    return (
        <div className="relative">
            {!isConnected && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-secondary-background/80 backdrop-blur-sm">
                    <p className="mb-4 text-center">
                        Please connect your wallet before sending tip.
                    </p>
                </div>
            )}
            <Card className="w-full max-w-5xl bg-secondary-background mx-auto">
                <CardHeader>
                    <CardTitle>Send Me a Tip</CardTitle>
                    <CardDescription>
                        If you appreciate my work and want to support me, feel
                        free to send me a tip!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0"
                                                type="number"
                                                onWheel={(e) => e.currentTarget.blur()}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Your Message"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full text-center font-heading cursor-pointer"
                                disabled={!isConnected || isTxPending}
                            >
                                {isTxPending && !hash ? (
                                    <LoaderIcon className="animate-spin" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default TipForm;
