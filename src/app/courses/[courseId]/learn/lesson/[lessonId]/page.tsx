import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/academy/lesson-player";

export default async function LessonPage({
    params
}: {
    params: Promise<{ courseId: string; lessonId: string }>
}) {
    const { courseId, lessonId } = await params;
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
            videoAsset: true,
            // content: true // If we had markdwon content
        }
    });

    if (!lesson) notFound();

    // Find next lesson for flow
    const nextLesson = await prisma.lesson.findFirst({
        where: {
            moduleId: lesson.moduleId,
            order: { gt: lesson.order }
        },
        orderBy: { order: 'asc' }
    });

    return (
        <LessonPlayer
            lesson={lesson}
            courseId={courseId}
            nextLessonId={nextLesson?.id}
        />
    );
}
