"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/api";
import { POSTS_CONTENT } from "@/constants/posts";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LazyImage } from "@/components/ui/LazyImage";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Helper to unescape HTML if the admin editor saved it as encoded text
function unescapeHtml(safe: string) {
  return safe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export function SinglePost({ post }: { post: Post }) {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const isRTL = language === "ar";
  const t = language === "en" ? POSTS_CONTENT.en : POSTS_CONTENT.ar;

  const displayDate = new Date(post.createdAt).toLocaleDateString(
    language === "ar" ? "ar-EG" : "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  const rawMarkdown = unescapeHtml(post.body);

  return (
    <article
      className={cn(
        "relative py-24 md:py-32 min-h-screen overflow-hidden transition-colors duration-500",
        isDark ? "bg-[#070d24]" : "bg-gradient-to-b from-[#f6f9ff] to-white"
      )}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        ) : (
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        )}
      </div>

      <div
        className={cn(
          "container max-w-5xl mx-auto px-4 md:px-8 relative",
          isRTL && "rtl"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link aria-label="Return to News list"             href="/posts"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-bold mb-10 transition-colors duration-300 group",
              isDark ? "text-gray-400 hover:text-white" : "text-[#4a6fa5] hover:text-[#0a1a4f]"
            )}
          >
            {isRTL ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            )}
            {t.backToNews}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "bg-white dark:bg-[#0a102a] rounded-3xl border shadow-xl overflow-hidden mb-12",
            isDark
              ? "border-white/5 shadow-black/40"
              : "border-primary/10 shadow-primary/5"
          )}
        >
          {post.image1Url && (
            <div className="w-full bg-gray-100 dark:bg-gray-800">
              <LazyImage
                src={post.image1Url}
                alt={post.title}
                width={1600}
                height={900}
                className="block w-full h-auto object-contain"
                wrapperClassName="w-full"
              />
            </div>
          )}

          <div className="p-8 md:p-12 lg:p-16">
            <time
              dateTime={new Date(post.createdAt).toISOString()}
              className={cn(
                "text-sm font-semibold uppercase tracking-wider mb-6 block",
                isDark ? "text-primary-light" : "text-primary"
              )}
            >
              {displayDate}
            </time>

            {/* English Version */}
            <div className="ltr:block rtl:hidden">
              <h1
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 leading-tight",
                  isDark ? "text-white" : "text-[#0a1a4f]"
                )}
              >
                {post.title}
              </h1>

              {/* GitHub Markdown Wrapper */}
              <div 
                data-theme={isDark ? "dark" : "light"}
                className="markdown-body !bg-transparent !text-inherit"
                style={{
                  backgroundColor: 'transparent',
                  color: isDark ? '#e5e7eb' : '#0a1a4f',
                }}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeRaw]}
                >
                  {rawMarkdown}
                </ReactMarkdown>
              </div>
            </div>

            {/* Arabic Version */}
            <div className="rtl:block ltr:hidden" dir="rtl">
              <h1
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 leading-tight text-right",
                  isDark ? "text-white" : "text-[#0a1a4f]"
                )}
              >
                {post.titleAr || post.title}
              </h1>

              {/* GitHub Markdown Wrapper */}
              <div 
                data-theme={isDark ? "dark" : "light"}
                className="markdown-body !bg-transparent !text-inherit text-right"
                style={{
                  backgroundColor: 'transparent',
                  color: isDark ? '#e5e7eb' : '#0a1a4f',
                }}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeRaw]}
                >
                  {post.bodyAr ? unescapeHtml(post.bodyAr) : rawMarkdown}
                </ReactMarkdown>
              </div>
            </div>

            {post.image2Url && (
              <div className="mt-16 w-full rounded-2xl overflow-hidden shadow-lg shadow-black/10 bg-gray-100 dark:bg-gray-800">
                <LazyImage
                  src={post.image2Url}
                  alt="Supplementary Material"
                  width={1600}
                  height={900}
                  className="block w-full h-auto object-contain"
                  wrapperClassName="w-full"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
