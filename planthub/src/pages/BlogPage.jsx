import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { BLOG_POSTS } from '../utils/blogData';
import { Calendar, User, ChevronRight } from 'lucide-react';

export default function BlogPage() {
  
  useEffect(() => {
    document.title = "Gardening Blog & Tips - Greenera Foundation";
    // For proper SEO, normally you'd update meta tags here via Helmet, 
    // but standard HTML semantic tags on the page help immensely.
  }, []);

  return (
    <div className="container page-enter" style={{ padding: 'var(--space-12) 0' }}>
      
      {/* SEO Optimized Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--space-4)', color: 'var(--primary-700)' }}>
          Gardening Blog & Tips
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Expert advice for new gardeners, seasonal plant care guides, and professional treatments for common plant diseases.
        </p>
      </div>

      <div className="grid grid-3" style={{ gap: 'var(--space-8)' }}>
        {BLOG_POSTS.map(post => (
          <article 
            key={post.id} 
            className="card card-hover" 
            style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
          >
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div className="badge" style={{ alignSelf: 'flex-start', marginBottom: 'var(--space-3)' }}>
                {post.category}
              </div>
              
              <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)', lineHeight: '1.4' }}>
                <Link to={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-6)', flex: 1 }}>
                {post.excerpt}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {post.date}
                  </span>
                </div>
                <Link to={`/blog/${post.id}`} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Read <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      
    </div>
  );
}
