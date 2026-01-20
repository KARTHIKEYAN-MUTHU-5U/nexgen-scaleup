import { prisma } from "@/lib/db/prisma";
import { CourseOutline } from "@/components/admin/course-outline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CourseEditorPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' }
                    }
                }
            }
        }
    });

    if (!course) notFound();

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/courses">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">{course.title}</h1>
                        <Badge variant={course.isPublished ? "default" : "outline"}>
                            {course.isPublished ? "Published" : "Draft"}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">/{course.slug}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" /> Preview
                    </Button>
                    <Button>Publish</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <CourseOutline course={course} />
                </div>
                <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-card">
                        <h3 className="font-semibold mb-4">Course Settings</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="text-muted-foreground block mb-1">Price</span>
                                <div className="font-medium">${course.price.toString()}</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground block mb-1">Description</span>
                                <div className="line-clamp-3">{course.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
