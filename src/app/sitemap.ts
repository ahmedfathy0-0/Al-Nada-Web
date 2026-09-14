import { MetadataRoute } from "next";
import { SERVICES } from "@/constants/services";
import { PARTNERS } from "@/constants/partners";
import { getPosts } from "@/lib/api";

const BASE_URL = "https://alnadascientific.com";
export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/services",
    "/partners",
    "/products",
    "/contact",
    "/training",
    "/posts",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : (route === "/posts" ? 0.9 : 0.8),
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const partnerRoutes = PARTNERS.map((partner) => ({
    url: `${BASE_URL}/partners/${partner.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const partnerProductsRoutes = PARTNERS.map((partner) => ({
    url: `${BASE_URL}/partners/${partner.slug}/products`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Fetch dynamic posts for the sitemap
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postRoutes = posts.map((post) => ({
      url: `${BASE_URL}/posts/${post.id}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
  }

  return [...routes, ...serviceRoutes, ...partnerRoutes, ...partnerProductsRoutes, ...postRoutes];
}
