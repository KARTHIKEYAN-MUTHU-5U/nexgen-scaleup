'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, AlertCircle, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { cn } from '@/lib/utils';

// Types (should originate from Prisma ideally, but mocked for UI component dev)
type Question = {
    id: string;
    prompt: string;
    options: string[]; // ['A', 'B', 'C', 'D']
    correctIndex: number;
    explanation?: string;
};

type QuizProps = {
    title: string;
    questions: Question[];
    onComplete?: (score: number, passed: boolean) => void;
};

export function QuizRunner({ title, questions, onComplete }: QuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    // Default to 1000/1000 if hook fails or not installed, purely for fallback
    const { width = 1000, height = 1000 } = { width: typeof window !== 'undefined' ? window.innerWidth : 1000, height: typeof window !== 'undefined' ? window.innerHeight : 1000 };

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        if (selectedOption === currentQuestion.correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
            const finalScore = selectedOption === currentQuestion.correctIndex ? score + 1 : score;
            const passed = (finalScore / questions.length) >= 0.7; // 70% to pass
            if (onComplete) onComplete(finalScore, passed);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        const passed = percentage >= 70;

        return (
            <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                {passed && <Confetti width={width} height={height} recycle={false} />}

                <div className="mb-6">
                    {passed ? (
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                    ) : (
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-12 h-12 text-red-600" />
                        </div>
                    )}
                    <h2 className="text-3xl font-bold mb-2">{passed ? "Quiz Passed!" : "Keep Practicing"}</h2>
                    <p className="text-muted-foreground text-lg">You scored {percentage}% ({score}/{questions.length})</p>
                </div>

                <div className="flex gap-4">
                    <Button onClick={resetQuiz} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Retry Quiz
                    </Button>
                    {passed && (
                        <Button>
                            Continue to Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="overflow-hidden border-2">
                <CardHeader className="bg-muted/30 pb-6 border-b">
                    <CardTitle className="text-xl leading-relaxed">{currentQuestion.prompt}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid gap-3">
                    {currentQuestion.options.map((option, idx) => {
                        let stateClass = "border-border hover:border-primary/50 hover:bg-muted/50";

                        if (selectedOption === idx) {
                            stateClass = "border-primary bg-primary/5 ring-1 ring-primary";
                        }

                        if (isAnswered) {
                            if (idx === currentQuestion.correctIndex) {
                                stateClass = "border-green-500 bg-green-50 text-green-700 font-medium";
                            } else if (idx === selectedOption && idx !== currentQuestion.correctIndex) {
                                stateClass = "border-red-500 bg-red-50 text-red-700";
                            } else {
                                stateClass = "opacity-50";
                            }
                        }

                        return (
                            <div
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                className={cn(
                                    "relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer",
                                    stateClass
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-bold shrink-0",
                                    isAnswered && idx === currentQuestion.correctIndex ? "border-green-500 bg-green-500 text-white" : "border-muted-foreground/30 text-muted-foreground",
                                    selectedOption === idx && !isAnswered && "border-primary text-primary"
                                )}>
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <span className="flex-1">{option}</span>

                                {isAnswered && idx === currentQuestion.correctIndex && <Check className="w-5 h-5 text-green-600 ml-2" />}
                                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <X className="w-5 h-5 text-red-600 ml-2" />}
                            </div>
                        );
                    })}
                </CardContent>

                {isAnswered && currentQuestion.explanation && (
                    <div className="px-6 pb-6 pt-0">
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex gap-3">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <div>
                                <span className="font-bold block mb-1">Explanation:</span>
                                {currentQuestion.explanation}
                            </div>
                        </div>
                    </div>
                )}

                <CardFooter className="p-6 pt-0 border-t bg-muted/10">
                    <div className="w-full pt-6 flex justify-end">
                        {!isAnswered ? (
                            <Button onClick={handleSubmitAnswer} disabled={selectedOption === null} size="lg">
                                Submit Answer
                            </Button>
                        ) : (
                            <Button onClick={handleNext} size="lg" className="gap-2">
                                {currentIndex === questions.length - 1 ? "View Results" : "Next Question"} <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
