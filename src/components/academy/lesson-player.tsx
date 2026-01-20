'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy'; // Lazy load
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ChevronRight, FileText, Download, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; // Need to install or implement hook

// Simple useWindowSize hook implementation if we don't install react-use
function useWindowSizeCustom() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export function LessonPlayer({ lesson, nextLessonId, courseId }: { lesson: any, nextLessonId?: string, courseId: string }) {
    const [completed, setCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSizeCustom();

    const handleVideoEnd = () => {
        if (!completed) {
            setCompleted(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5s
            // Trigger server action to mark complete
        }
    };

    return (
        <div className="flex flex-col h-full">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

            {/* Video Player Container */}
            <div className="w-full bg-black aspect-video relative group">
                <ReactPlayer
                    url={lesson.videoUrl || "https://www.youtube.com/watch?v=LXb3EKWsInQ"} // Default dummy for demo
                    width="100%"
                    height="100%"
                    controls
                    onEnded={handleVideoEnd}
                    config={{
                        youtube: { playerVars: { showinfo: 1 } }
                    }}
                />
            </div>

            <div className="container max-w-4xl mx-auto p-4 md:p-8">
                <div className="flex items-start justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
                        <p className="text-muted-foreground line-clamp-2">
                            {lesson.description || "Mastering the fundamentals of this topic to build scalable AI systems."}
                        </p>
                    </div>
                    <Button
                        size="lg"
                        variant={completed ? "outline" : "default"}
                        onClick={() => handleVideoEnd()} // Manual complete
                        className={cn("shrink-0", completed && "border-green-500 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700")}
                    >
                        {completed ? (
                            <>
                                <CheckCircle className="mr-2 h-5 w-5" /> Completed
                            </>
                        ) : (
                            "Mark Complete"
                        )}
                    </Button>
                </div>

                <Tabs defaultValue="notes" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    </TabsList>
                    <div className="mt-6">
                        <TabsContent value="notes" className="space-y-4">
                            <Card>
                                <CardContent className="pt-6 prose dark:prose-invert max-w-none">
                                    <h3>Key Takeaways</h3>
                                    <ul>
                                        <li>The importance of transformer architecture in modern LLMs.</li>
                                        <li>How attention mechanisms weigh input tokens.</li>
                                        <li>Optimizing inference using quantization.</li>
                                    </ul>
                                    <p>
                                        Remember to review the <code>attention.py</code> snippet provided in the resources tab.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="resources">
                            <Card>
                                <CardContent className="pt-6 space-y-2">
                                    <ResourceItem title="Source Code (GitHub)" type="link" />
                                    <ResourceItem title="Lecture Slides (PDF)" type="file" />
                                    <ResourceItem title="Research Paper: Attention is All You Need" type="link" />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="discussion">
                            <div className="text-center py-10 bg-muted/20 rounded-lg">
                                <MessageSquare className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">Community Discussion</h3>
                                <p className="text-muted-foreground mb-4">Join the private Discord to discuss this lesson.</p>
                                <Button variant="outline">Open Discord</Button>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}

function ResourceItem({ title, type }: { title: string, type: 'link' | 'file' }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded text-primary">
                    {type === 'link' ? <ChevronRight className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </div>
                <span className="font-medium group-hover:text-primary transition-colors">{title}</span>
            </div>
            <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )
}
