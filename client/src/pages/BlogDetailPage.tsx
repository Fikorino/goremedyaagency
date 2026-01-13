import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Seo } from "@/components/Seo";
import { api } from "@/lib/api";
import { BlogPost } from "@/lib/types";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      api.getBlogPost(slug).then(setPost).catch(() => null);
    }
    api.getBlog().then(setPosts).catch(() => null);
  }, [slug]);

  const toc = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split("\n");
    return lines
      .filter((line) => line.startsWith("##"))
      .map((line) => {
        const depth = line.startsWith("###") ? 3 : 2;
        const title = line.replace(/###?\s/, "").trim();
        const id = title.toLowerCase().replace(/\s+/g, "-");
        return { depth, title, id };
      });
  }, [post]);

  const readingTime = useMemo(() => {
    if (!post) return 0;
    const words = post.content.split(/\s+/).length;
    return Math.max(4, Math.round(words / 200));
  }, [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  }, [posts, post]);

  if (!post) {
    return <div className="container-page py-20">Yükleniyor...</div>;
  }

  return (
    <div className="section">
      <Seo
        title={`${post.seoTitle} | Göre Medya Ajans`}
        description={post.seoDescription}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.createdAt,
        }}
      />
      <div className="container-page">
        <Link to="/" className="text-sm font-semibold">← Ana Sayfaya Dön</Link>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.6fr]">
          <article>
            <img src={post.coverUrl} alt={post.title} className="h-72 w-full rounded-3xl object-cover" />
            <div className="mt-6 flex items-center gap-3 text-xs text-black/50">
              <span className="badge">{post.category}</span>
              <span>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
              <span>{readingTime} dk okuma</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold">{post.title}</h1>
            <p className="mt-4 text-black/70">{post.excerpt}</p>
            <div className="prose prose-lg mt-8 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/\s+/g, "-");
                    return <h2 id={id}>{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/\s+/g, "-");
                    return <h3 id={id}>{children}</h3>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a className="button-secondary" href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noreferrer">
                LinkedIn'de Paylaş
              </a>
              <a className="button-secondary" href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noreferrer">
                X'te Paylaş
              </a>
            </div>
          </article>
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold">İçindekiler</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "ml-4" : ""}>
                    <a href={`#${item.id}`} className="text-black/70 hover:text-black">{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold">İlgili Yazılar</h3>
              <div className="mt-4 space-y-4 text-sm">
                {relatedPosts.map((item) => (
                  <Link key={item.id} to={`/blog/${item.slug}`} className="block">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-black/50">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
