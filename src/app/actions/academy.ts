'use server';

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// --- Courses ---

export async function createCourse(data: { title: string; description: string; price: number }) {
    try {
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const course = await prisma.course.create({
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: `${slug}-${Date.now()}`, // Ensure unique
            },
        });
        revalidatePath("/admin/courses");
        return { success: true, courseId: course.id };
    } catch (error) {
        console.error("Create Course Error:", error);
        return { error: "Failed to create course" };
    }
}

export async function updateCourse(id: string, data: { title?: string; description?: string; price?: number; isPublished?: boolean }) {
    try {
        await prisma.course.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/courses");
        return { success: true };
    } catch (error) {
        console.error("Update Course Error:", error);
        return { error: "Failed to update course" };
    }
}

export async function deleteCourse(id: string) {
    try {
        await prisma.course.delete({ where: { id } });
        revalidatePath("/admin/courses");
        return { success: true };
    } catch (error) {
        console.error("Delete Course Error:", error);
        return { error: "Failed to delete course" };
    }
}

// --- Modules ---

export async function createModule(courseId: string, title: string) {
    try {
        // Get last order
        const lastModule = await prisma.module.findFirst({
            where: { courseId },
            orderBy: { order: 'desc' },
        });
        const order = lastModule ? lastModule.order + 1 : 0;

        await prisma.module.create({
            data: {
                courseId,
                title,
                order,
            },
        });
        revalidatePath(`/admin/courses/${courseId}`); // Assuming dynamic route for course builder
        return { success: true };
    } catch (error) {
        console.error("Create Module Error:", error);
        return { error: "Failed to create module" };
    }
}

// --- Lessons ---
export async function createLesson(moduleId: string, title: string) {
    try {
        const lastLesson = await prisma.lesson.findFirst({
            where: { moduleId },
            orderBy: { order: 'desc' },
        });
        const order = lastLesson ? lastLesson.order + 1 : 0;

        await prisma.lesson.create({
            data: {
                moduleId,
                title,
                order,
            },
        });
        // We don't have easy access to courseId here for revalidation without a query, 
        // but usually this is called from a page that we can revalidate.
        // For now, return success.
        return { success: true };
    } catch (error) {
        console.error("Create Lesson Error:", error);
        return { error: "Failed to create lesson" };
    }
}
