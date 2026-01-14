import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { api, BlogPost } from "@/lib/api";

function extractToc(content: string) {
  const lines = content.split("\n");
  return lines
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => ({
      level: line.startsWith("### ") ? 3 : 2,
      text: line.replace(/^###? /, ""),
      id: slugify(line.replace(/^###? /, ""))
    }));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü ]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
}

function markdownToHtml(content: string) {
  return content
    .replace(/^### (.*)$/gm, (match, heading) => `<h3 id="${slugify(heading)}">${heading}</h3>`)
    .replace(/^## (.*)$/gm, (match, heading) => `<h2 id="${slugify(heading)}">${heading}</h2>`)
    .replace(/^# (.*)$/gm, (match, heading) => `<h1 id="${slugify(heading)}">${heading}</h1>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, "<br/><br/>");
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      api.getBlogPost(slug).then(setPost).catch(() => setPost(null));
    }
    api.getBlog().then(setPosts).catch(() => setPosts([]));
  }, [slug]);

  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);
  const related = posts.filter((item) => item.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <section className="section-padding">
        <p>Yükleniyor...</p>
      </section>
    );
  }

  const shareUrl = `https://goremedyaajans.com/blog/${post.slug}`;

  return (
    <PageTransition>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.createdAt,
            author: {
              "@type": "Organization",
              name: "Göre Medya Ajans"
            }
          })}
        </script>
      </Helmet>
      <section className="section-padding">
        <Link to="/blog" className="text-xs font-semibold text-black/60">
          ← Bloga Dön
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <article>
            <p className="text-xs font-semibold text-black/50">{post.category}</p>
            <h1 className="mt-3 text-4xl font-heading font-semibold">{post.title}</h1>
            <p className="mt-2 text-sm text-black/50">
              {post.readingTime} dk okuma • {new Date(post.createdAt).toLocaleDateString("tr-TR")}
            </p>
            <img src={post.cover} alt={post.title} className="mt-6 h-72 w-full rounded-2xl object-cover" />
            <div
              className="prose mt-6 max-w-none text-black/80"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                className="button-outline"
                href={`https://www.linkedin.com/shareArticle?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn'de Paylaş
              </a>
              <a
                className="button-outline"
                href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                X'te Paylaş
              </a>
            </div>
          </article>
          <aside className="space-y-8">
            <div className="rounded-2xl border border-black/10 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold">İçindekiler</h3>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/10 p-6">
              <h3 className="text-lg font-semibold">İlgili Yazılar</h3>
              <div className="mt-4 space-y-4">
                {related.map((item) => (
                  <Link key={item.id} to={`/blog/${item.slug}`} className="block text-sm font-semibold">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
