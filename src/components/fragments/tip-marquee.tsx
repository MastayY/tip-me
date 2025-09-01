import Marquee from "@/components/ui/marquee";
import { Card } from "../ui/card";

const TipMarquee = ({ items }: { items?: string[] }) => {
    if (items === undefined || items?.length === 0) {
        return (
            <Card className="w-full py-0 max-w-5xl bg-secondary-background mx-auto my-5 shadow-0 border-0">
                <Marquee
                    items={[
                        "Thank you for your support! 🎉",
                        "Thank you for your support! 🎉",
                        "Thank you for your support! 🎉",
                        "Thank you for your support! 🎉",
                        "Thank you for your support! 🎉",
                    ]}
                />
            </Card>
        );
    }

    return (
        <>
            <Card className="w-full py-0 max-w-5xl bg-secondary-background mx-auto my-5 shadow-0 border-0">
                <Marquee items={items} />
            </Card>
        </>
    );
};

export default TipMarquee;
