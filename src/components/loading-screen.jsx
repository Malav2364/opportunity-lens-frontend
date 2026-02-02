"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

const quotes = [
    "The expert in anything was once a beginner.",
    "Learning never exhausts the mind.",
    "Education is the passport to the future.",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Small steps in the right direction can turn out to be the biggest step of your life.",
    "Don't stop until you're proud.",
    "Work hard in silence, let your success be your noise.",
    "The only way to do great work is to love what you do."
];

export function LoadingScreen() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        // Pick a random quote on mount
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center p-6 text-center max-w-md w-full"
            >
                {/* Logo or Spinner Animation */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <Loader2 className="h-16 w-16 text-primary" />
                </motion.div>

                {/* Quote Container */}
                <AnimatePresence mode="wait">
                    {quote && (
                        <motion.div
                            key={quote}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                                "{quote}"
                            </h3>
                            <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground animate-pulse mt-4">
                                Preparing your experience...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
