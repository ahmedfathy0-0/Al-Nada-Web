const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getRequiredApiBase() {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
  }

  return API_BASE;
}

export interface Post {
  id: string;
  title: string;
  titleAr: string | null;
  body: string;
  bodyAr: string | null;
  image1Url: string | null;
  image1Id: string | null;
  image2Url: string | null;
  image2Id: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${getRequiredApiBase()}/posts`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${getRequiredApiBase()}/posts/${id}`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    if (res.status === 404) return null as any;
    throw new Error('Failed to fetch post');
  }
  
  return res.json();
}
