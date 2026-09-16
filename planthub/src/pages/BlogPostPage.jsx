import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BLOG_POSTS } from '../utils/blogData';

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = BLOG_POSTS.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      document.title = `${foundPost.title} - Greenera Foundation`;
    }
  }, [id]);

  if (!post) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h2>Article not found</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Hero Header */}
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <img 
          src={post.image} 
          alt={post.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))' }} />
        
        <div className="container" style={{ position: 'absolute', bottom: 'var(--space-8)', left: 0, right: 0, color: 'white' }}>
          <button 
            className="btn btn-ghost" 
            onClick={() => navigate('/blog')} 
            style={{ marginBottom: 'var(--space-4)', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
          >
            <ArrowLeft size={20} /> Back to Blog
          </button>
          
          <div className="badge badge-success" style={{ marginBottom: 'var(--space-4)', display: 'inline-block' }}>
            {post.category}
          </div>
          
          <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {post.title}
          </h1>
          
          <div style={{ display: 'flex', gap: 'var(--space-6)', fontSize: '1rem', opacity: 0.9 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> {post.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} /> {post.date}
            </span>
          </div>
        </div>
      </div>

      {/* Semantic Article Tag for SEO */}
      <div className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
        <article 
          className="blog-content" 
          style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-primary)' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
          <h3>Ready to start gardening?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Check out our collection of healthy, beautiful plants.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">Shop Plants</Link>
        </div>
      </div>
    </div>
  );
}
