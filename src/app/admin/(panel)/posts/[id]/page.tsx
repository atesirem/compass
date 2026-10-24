import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { deletePostAction } from "../../../_actions/posts";
import { ConfirmSubmit } from "../../../_components/Feedback";
import { PostForm, type PostValues } from "../../../_components/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params, searchParams }: PageProps<"/admin/posts/[id]">) {
  const [{ id }, query, user] = await Promise.all([params, searchParams, requireStaff()]);

  let initial: PostValues = {
    slug: "",
    locale: "tr",
    kind: "EXPERIENCE",
    status: "DRAFT",
    title: "",
    summary: "",
    bodyMarkdown: "",
    authorName: "",
    tags: "",
    guideSlug: "",
  };
  let postId: string | null = null;

  if (id !== "new") {
    const post = await db.post.findUnique({ where: { id } });
    if (!post) notFound();
    postId = post.id;
    initial = {
      slug: post.slug,
      locale: post.locale as PostValues["locale"],
      kind: post.kind,
      status: post.status,
      title: post.title,
      summary: post.summary,
      bodyMarkdown: post.bodyMarkdown,
      authorName: post.authorName,
      tags: post.tags.join(", "),
      guideSlug: post.guideSlug ?? "",
    };
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-2 text-sm text-fg-muted">
        <Link href="/admin/posts" className="hover:underline">
          Blog posts
        </Link>{" "}
        / {postId ? "Edit" : "New"}
      </nav>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{postId ? "Edit post" : "New post"}</h1>
      <PostForm key={id} postId={postId} role={user.role} initial={initial} justCreated={query.created === "1"} />
      {postId && user.role === "ADMIN" && (
        <form action={deletePostAction} className="mt-10 border-t border-line pt-4">
          <input type="hidden" name="id" value={postId} />
          <ConfirmSubmit message="Delete this post? This cannot be undone.">Delete this post</ConfirmSubmit>
        </form>
      )}
    </>
  );
}
