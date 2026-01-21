import { redirect } from "next/navigation";

export default function AdminPage() {
    // Redirect to the admin courses page
    redirect("/admin/courses");
}
