import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageClient from "./pageclient";

type Post = {
  title: string;
  date: string;
  slug: string;
};

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "src", "app", "posts");
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Directory not found: ${postsDirectory}`);
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
  .filter((filename) => filename.endsWith(".md"))
  .map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, "");

    return {
      title: data.title,
      date: data.date,
      slug,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function Home() {
  const posts = await getPosts();
  return <PageClient posts={posts} />;
}
