import { prisma } from "@/lib/db/prisma";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CreateCourseDialog } from "@/components/admin/create-course-dialog"; // We will create this
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminCoursesPage() {
    const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: { enrollments: true }
            }
        }
    });

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                    <p className="text-muted-foreground">Manage your curriculum and content.</p>
                </div>
                <CreateCourseDialog />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No courses found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/admin/courses/${course.id}`} className="hover:underline">
                                            {course.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={course.isPublished ? "default" : "secondary"}>
                                            {course.isPublished ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${course.price.toString()}</TableCell>
                                    <TableCell>{course._count.enrollments}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/courses/${course.id}`}>Edit</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
