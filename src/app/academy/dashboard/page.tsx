import { prisma } from "@/lib/db/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function StudentDashboard() {
    // Mock enrollments (since we don't have auth/checkout yet)
    const courses = await prisma.course.findMany({
        where: { isPublished: true },
        take: 2
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student!</h1>
                <p className="text-muted-foreground">Continue where you left off.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses inside Progress</CardTitle>
                        <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">My Courses</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map(course => (
                        <Card key={course.id} className="flex flex-col">
                            <div className="aspect-video bg-muted relative">
                                {/* Placeholder generic image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    Course Thumbnail
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="mt-auto">
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Progress</span>
                                        <span>35%</span>
                                    </div>
                                    <Progress value={35} className="h-2" />
                                </div>
                                <Button className="w-full" asChild>
                                    <Link href={`/courses/${course.slug || course.id}/learn`}>Continue Learning</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
