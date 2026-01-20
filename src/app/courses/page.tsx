import { prisma } from "@/lib/db/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BookOpen, GraduationCap, PlayCircle, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function CourseCatalogPage() {
    const courses = await prisma.course.findMany({
        where: { isPublished: true },
        include: {
            _count: {
                select: { modules: true }
            }
        }
    });

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-zinc-950 text-white py-20">
                <div className="container px-4 md:px-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="font-semibold tracking-wide">ACADEMY</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 max-w-4xl">
                        Advance your career with <span className="text-purple-400">Engineering-Grade</span> AI Courses.
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl">
                        Practical, production-ready curriculum designed for developers who want to build real AI systems, not just demos.
                    </p>
                </div>
            </div>

            {/* Course Grid */}
            <div className="container px-4 md:px-6 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-card border rounded-xl">
                            <p className="text-muted-foreground">New courses coming soon. Stay tuned!</p>
                        </div>
                    ) : (
                        courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function CourseCard({ course }: { course: any }) {
    return (
        <Card className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow border-zinc-200 dark:border-zinc-800">
            <div className="aspect-video bg-zinc-100 relative group overflow-hidden">
                {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                        <BookOpen className="w-12 h-12 text-purple-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full h-12 w-12 bg-white text-black hover:bg-white/90">
                        <PlayCircle className="w-6 h-6 fill-current" />
                    </Button>
                </div>
            </div>

            <CardHeader className="space-y-2 p-6 pb-4">
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className="rounded-sm font-normal">
                        {course.level || 'Intermediate'}
                    </Badge>
                    <div className="flex items-center text-xs font-semibold text-amber-500">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        4.9
                    </div>
                </div>
                <h3 className="font-bold text-xl line-clamp-2 min-h-[56px] font-heading leading-tight">
                    <Link href={`/courses/${course.slug || course.id}`} className="hover:text-primary transition-colors">
                        {course.title}
                    </Link>
                </h3>
            </CardHeader>

            <CardContent className="flex-1 p-6 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {course.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course._count.modules} Modules
                    </div>
                    <div>
                        12h 30m
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 border-t bg-muted/20 mt-auto flex items-center justify-between">
                <div className="text-lg font-bold">
                    ${course.price.toString()}
                </div>
                <Button asChild size="sm">
                    <Link href={`/courses/${course.slug || course.id}`}>
                        View Details
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
