import TeacherPublicProfile from "@/components/teacher/TeacherPublicProfile";

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TeacherPublicProfile teacherId={Number(id)} />;
}
