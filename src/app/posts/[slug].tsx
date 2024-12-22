import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostProps = {
  title: string;
  content: string;
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "src", "app", "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postsDirectory = path.join(process.cwd(), "src", "app", "posts");
  const filePath = path.join(postsDirectory, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      title: data.title || "Untitled Post",
      content: content || "No content available.",
    },
  };
}

export default function Post({ title, content }: PostProps) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Gabriel Marinho</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose prose-neutral max-w-none">
          {content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </main>
      <footer className="bg-white border-t border-neutral-200 py-4">
        <div className="container mx-auto text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Gabriel Marinho. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
