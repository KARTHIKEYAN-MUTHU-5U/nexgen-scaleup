import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CheckCircle, Circle, Menu, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cn } from "@/lib/utils";

// Helper to determine active lesson
const isLessonActive = (lessonId: string, currentLessonId: string) => lessonId === currentLessonId;

export default async function CourseLearnLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;

    const course = await prisma.course.findFirst({
        where: {
            OR: [
                { id: courseId },
                { slug: courseId }
            ]
        },
        include: {
            modules: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                        include: {
                            progress: {
                                where: { userId: "user-123" } // Mock User ID
                            }
                        }
                    }
                }
            }
        }
    });

    if (!course) notFound();

    // Mock Progress Calculation
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = course.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.progress.length > 0 && l.progress[0].isCompleted).length, 0);
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;

    return (
        <div className="flex h-screen w-full flex-col md:flex-row bg-background">
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b p-4 md:hidden">
                <span className="font-semibold truncate">{course.title}</span>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon"><Menu /></Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0">
                        <CourseSidebarContent course={course} progress={progressPercentage} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden h-full w-80 shrink-0 flex-col border-r md:flex">
                <CourseSidebarContent course={course} progress={progressPercentage} />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function CourseSidebarContent({ course, progress }: { course: any, progress: number }) {
    return (
        <div className="flex h-full flex-col">
            <div className="p-4 border-b">
                <h2 className="font-semibold mb-2 line-clamp-1" title={course.title}>{course.title}</h2>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{progress}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="flex flex-col">
                    {course.modules.map((module: any) => (
                        <div key={module.id} className="border-b last:border-0 pb-2">
                            <div className="px-4 py-3 font-medium text-sm bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
                                {module.title}
                            </div>
                            <div className="flex flex-col">
                                {module.lessons.map((lesson: any) => {
                                    const isCompleted = lesson.progress.length > 0 && lesson.progress[0].isCompleted;
                                    // Normally we would compare current route to highlight active
                                    // For layout, we just render links
                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={`/courses/${course.slug || course.id}/learn/lesson/${lesson.id}`}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary/50",
                                                // "bg-primary/5 text-primary" // Active state logic needed here via hooks or props
                                            )}
                                        >
                                            <div className="shrink-0">
                                                {isCompleted ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <PlayCircle className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <span className="line-clamp-1">{lesson.title}</span>
                                            <span className="ml-auto text-xs text-muted-foreground">10m</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
