import { Metadata } from 'next';
import { getPosts } from '@/lib/api';
import { PostsPageClient } from '@/components/features/posts/PostsPageClient';
import { BASE_URL, cleanDescription } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Blog & News',
  description:
    'Read the latest updates, news, and technical articles about environmental instruments, scientific equipment, and measuring devices from Al-Nada Scientific Office.',
  alternates: {
    canonical: '/posts/',
  },
  openGraph: {
    type: 'website',
    title: 'Blog & News | Al-Nada Scientific Office',
    description:
      'Read the latest updates, news, and technical articles about environmental instruments, scientific equipment, and measuring devices from Al-Nada Scientific Office.',
    url: `${BASE_URL}/posts/`,
  },
};

export default async function PostsPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }

  // Generate CollectionPage + ItemList JSON-LD
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog & News | Al-Nada Scientific Office',
    description:
      'Latest updates, news, and technical articles about environmental instruments and scientific equipment.',
    url: `${BASE_URL}/posts/`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `${BASE_URL}/posts/${post.id}/`,
        description: cleanDescription(post.body, 120),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd),
        }}
      />
      <PostsPageClient initialPosts={posts} />
    </>
  );
}
