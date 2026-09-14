import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/api';
import { SinglePost } from '@/components/features/posts/SinglePost';
import {
  cleanDescription,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  BASE_URL,
} from '@/lib/seo-utils';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = cleanDescription(post.body);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/posts/${post.id}/`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `${BASE_URL}/posts/${post.id}/`,
      images: post.image1Url ? [{ url: post.image1Url }] : [],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ['Al-Nada Scientific Office'],
      section: 'Scientific Instruments',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image1Url ? [post.image1Url] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    if (!posts || posts.length === 0) {
      return [{ id: 'not-found' }];
    }
    return posts.map((post) => ({
      id: post.id,
    }));
  } catch {
    return [{ id: 'not-found' }];
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const articleJsonLd = generateArticleJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: BASE_URL },
    { name: 'Blog & News', url: `${BASE_URL}/posts/` },
    { name: post.title, url: `${BASE_URL}/posts/${post.id}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
      <SinglePost post={post} />
    </>
  );
}
