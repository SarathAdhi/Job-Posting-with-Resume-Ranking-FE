import Link from "next/link";
import { PageLayout } from "../common/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout className="grid">
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
      <Link href="/job/suggestion">Job Suggestion</Link>
      <Link href="/job/create">Create Job Post</Link>
      <Link href="/job">Job Post</Link>
    </PageLayout>
  );
}
