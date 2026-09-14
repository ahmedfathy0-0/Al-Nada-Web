"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/lib/api";
import { getPosts } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { PostsList } from "./PostsList";

interface PostsPageClientProps {
  initialPosts?: Post[];
}

export function PostsPageClient({ initialPosts }: PostsPageClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts ?? []);
  const [loading, setLoading] = useState(!initialPosts || initialPosts.length === 0);

  useEffect(() => {
    // Always refresh from API on the client to pick up posts added since the last static build
    getPosts()
      .then(setPosts)
      .catch((error) => {
        console.error(error);
        // Keep initialPosts if the client-side fetch fails
        if (!initialPosts || initialPosts.length === 0) {
          setPosts([]);
        }
      })
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  return <PostsList posts={posts} />;
}