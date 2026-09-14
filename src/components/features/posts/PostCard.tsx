"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LazyImage } from "@/components/ui/LazyImage";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/api";
import { POSTS_CONTENT } from "@/constants/posts";
import { ArrowRight } from "lucide-react";

export function PostCard({
  post,
  index,
  language,
  isDark,
}: {
  post: Post;
  index: number;
  language: string;
  isDark: boolean;
}) {
  const isRTL = language === "ar";
  const t = language === "en" ? POSTS_CONTENT.en : POSTS_CONTENT.ar;

  const displayDate = new Date(post.createdAt).toLocaleDateString(
    language === "ar" ? "ar-EG" : "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  // English Excerpt
  const plainText = post.body
    .replace(/<[^>]+>/g, '') // Strip HTML
    .replace(/^#+\s+/gm, '') // Strip markdown headings
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace markdown links
    .replace(/[*_~`>]/g, '') // Strip formatting characters
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
  const excerpt = plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;

  // Arabic Excerpt (fallback to English)
  const plainTextAr = post.bodyAr
    ? post.bodyAr
        .replace(/<[^>]+>/g, '')
        .replace(/^#+\s+/gm, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/[*_~`>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    : plainText;
  const excerptAr = plainTextAr.length > 120 ? plainTextAr.substring(0, 120) + "..." : plainTextAr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col h-full"
    >
      <Link 
        href={`/posts/${post.id}`} 
        className="flex flex-col flex-1"
        aria-label={`${t.readArticle}: ${post.titleAr || post.title}`}
      >
        <div
          className={cn(
            "flex flex-col flex-1 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border",
            isDark
              ? "bg-[#0a102a] border-white/5 hover:border-primary/30 shadow-lg shadow-black/30 hover:shadow-primary/10"
              : "bg-white border-primary/10 hover:border-primary/30 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10",
            isRTL ? "text-right rtl" : "text-left ltr"
          )}
        >
          {/* Cover Image */}
          {post.image1Url && (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <LazyImage
                src={post.image1Url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col flex-1">
            <div
              className={cn(
                "text-xs font-semibold uppercase tracking-wider mb-3",
                isDark ? "text-primary-light" : "text-primary"
              )}
            >
              {displayDate}
            </div>
            
            {/* EN */}
            <div className="block rtl:hidden">
              <h3
                className={cn(
                  "text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300",
                  isDark
                    ? "text-white group-hover:text-primary-light"
                    : "text-[#0a1a4f] group-hover:text-primary"
                )}
              >
                {post.title}
              </h3>
              <p
                className={cn(
                  "text-sm mb-6 flex-1 line-clamp-3 leading-relaxed",
                  isDark ? "text-gray-400" : "text-[#4a6fa5]"
                )}
              >
                {excerpt}
              </p>
            </div>

            {/* AR */}
            <div className="hidden rtl:block text-right" dir="rtl">
              <h3
                className={cn(
                  "text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300",
                  isDark
                    ? "text-white group-hover:text-primary-light"
                    : "text-[#0a1a4f] group-hover:text-primary"
                )}
              >
                {post.titleAr || post.title}
              </h3>
              <p
                className={cn(
                  "text-sm mb-6 flex-1 line-clamp-3 leading-relaxed",
                  isDark ? "text-gray-400" : "text-[#4a6fa5]"
                )}
              >
                {excerptAr}
              </p>
            </div>

            <div
              className={cn(
                "inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 mt-auto",
                isDark
                  ? "text-primary-light group-hover:text-white"
                  : "text-primary group-hover:text-[#0a1a4f]"
              )}
            >
              {t.readArticle}
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isRTL
                    ? "rotate-180 group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                )}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
