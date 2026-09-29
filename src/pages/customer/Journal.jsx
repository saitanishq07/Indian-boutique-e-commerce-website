import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/mockData';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function Journal({ onNavigate }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <button
          onClick={() => setSelectedPost(null)}
          className="text-xs font-bold text-[#4A0E17] hover:underline uppercase flex items-center gap-1 cursor-pointer"
        >
          ← BACK TO JOURNAL ARTICLES
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#C5A059] font-bold uppercase tracking-widest">
            <span>{selectedPost.category}</span>
            <span>·</span>
            <span>{selectedPost.date}</span>
            <span>·</span>
            <span>{selectedPost.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#222222]">
            {selectedPost.title}
          </h1>
        </div>

        <div className="w-full aspect-16/9 rounded-lg overflow-hidden border border-[#E8DFD5]">
          <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose max-w-none text-sm text-[#222222]/80 leading-relaxed font-sans space-y-4 whitespace-pre-line bg-white p-8 rounded border border-[#E8DFD5]">
          {selectedPost.content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">TEXTILE & FASHION JOURNAL</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#222222]">THE AAVANI JOURNAL</h1>
        <p className="text-xs text-[#222222]/60">Stories of Indian handlooms, saree drape guides, and heritage craft preservation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-lg border border-[#E8DFD5] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-full aspect-16/10 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#C5A059] font-bold uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span className="text-[#222222]/40 font-normal">{post.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#222222] group-hover:text-[#4A0E17] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-[#222222]/70 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-transparent">
              <span className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                READ ARTICLE <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
