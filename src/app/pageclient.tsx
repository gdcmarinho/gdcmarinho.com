"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaBars } from "react-icons/fa";

type Post = {
  title: string;
  date: string;
  slug: string;
};

export default function PageClient({ posts }: { posts: Post[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100 focus:ring focus:ring-neutral-200"
          >
            <FaBars size={20} />
          </button>
          {isMenuOpen && (
            <div className="absolute left-4 top-14 bg-white shadow-lg rounded-lg border border-neutral-200 z-50 w-48">
              <nav className="flex flex-col">
                <Link
                  href="/"
                  className="px-4 py-2 hover:bg-neutral-100 text-sm text-neutral-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 hover:bg-neutral-100 text-sm text-neutral-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2 hover:bg-neutral-100 text-sm text-neutral-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
          <h1 className="text-xl font-semibold">Gabriel Marinho</h1>
          <div className="flex space-x-3">
            <a href="https://www.linkedin.com/in/gdcmarinho" className="text-neutral-600 hover:text-blue-600">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/gdcmarinho" className="text-neutral-600 hover:text-neutral-800">
              <FaGithub size={20} />
            </a>
            <a href="mailto:gdcmarinho@gmail.com" className="text-neutral-600 hover:text-red-600">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-neutral-100 rounded-lg animate-pulse h-24"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Link
                  href={`/posts/${post.slug}`}
                  key={index}
                  className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
                >
                  <h3 className="text-lg font-medium text-neutral-800 hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    Published on {new Date(post.date).toLocaleDateString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-neutral-500">No posts available.</p>
            )}
          </div>
        )}
      </main>
      <footer className="bg-white border-t border-neutral-200 py-4">
        <div className="container mx-auto text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Gabriel Marinho. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
