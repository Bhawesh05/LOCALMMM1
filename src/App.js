import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import { startAutoPosting } from './autoPoster';

// CACHE BUSTING - Force fresh load
const APP_VERSION = '1.0.5'; // Changed version
console.log('🚀 CRICKET GROUP Active - Version:', APP_VERSION);

// Initialize Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://rjzojhsugnmqwnsbpzzp.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqem9qaHN1Z25tcXduc2JwenpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDI5MjUsImV4cCI6MjA3ODc3ODkyNX0.eTb334q2nQVI5NVB0bj6CgutTsHlBg-6OjhJkdQht0A';

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    username: '',
    problem: '',
    image: null
  });
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    console.log('🤖 Auto-poster starting...');
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    
    // Start auto-posting with error handling
    try {
      const autoPostInterval = startAutoPosting();
      
      return () => {
        clearInterval(interval);
        if (autoPostInterval) clearInterval(autoPostInterval);
      };
    } catch (error) {
      console.error('Auto-poster failed:', error);
    }
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return null;

    const fileType = file.type;
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    const supportedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
    const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
    
    if (!supportedImageTypes.includes(fileType) && !supportedExtensions.includes(fileExt)) {
      alert('Please upload only image files (JPG, PNG, GIF, WebP, BMP, SVG)');
      return null;
    }

    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Upload failed: ' + uploadError.message);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        type: fileType,
        name: file.name,
        extension: fileExt
      };
    } catch (error) {
      console.error('File upload error:', error);
      alert('Upload error: ' + error.message);
      return null;
    }
  };

  const fetchPosts = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          *,
          comments (*),
          likes (*),
          post_images (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedPosts = posts.map(post => ({
        id: post.id,
        username: post.username || 'Anonymous',
        problem: post.problem,
        createdAt: post.created_at,
        likes: post.likes?.length || 0,
        images: post.post_images || [],
        comments: post.comments || []
      }));
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.problem.trim()) {
      alert('Please enter something to post!');
      return;
    }
    
    setLoading(true);
    
    try {
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            username: newPost.username || 'Anonymous',
            problem: newPost.problem,
            category: 'General'
          }
        ])
        .select()
        .single();

      if (postError) throw postError;

      if (newPost.image) {
        const fileData = await handleImageUpload(newPost.image);
        
        if (fileData) {
          await supabase
            .from('post_images')
            .insert([{ 
              post_id: postData.id, 
              image_url: fileData.url,
              file_type: fileData.type,
              file_name: fileData.name,
              file_extension: fileData.extension
            }]);
        }
      }

      setNewPost({
        username: '',
        problem: '',
        image: null
      });
      
      setTimeout(fetchPosts, 1000);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment[postId]?.trim()) return;
    
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            username: newComment[postId + '-username'] || 'Anonymous',
            comment: newComment[postId]
          }
        ]);

      if (error) throw error;
      
      setNewComment(prev => ({ 
        ...prev, 
        [postId]: '', 
        [postId + '-username']: '' 
      }));
      
      setTimeout(fetchPosts, 1000);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { error } = await supabase
        .from('likes')
        .insert([{ post_id: postId }]);

      if (error) throw error;
      setTimeout(fetchPosts, 1000);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const getVisibleComments = (post) => {
    if (!post.comments) return [];
    if (expandedComments[post.id]) return post.comments;
    return post.comments.slice(0, 2);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = (now - postTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return `${Math.floor(diffInHours * 60)}m ago`;
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return postTime.toLocaleDateString();
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>CRICKET GROUP</h1>
            <small style={{fontSize: '0.7rem', color: '#666'}}>Version {APP_VERSION} - Auto Active</small>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="create-post-section">
          <h2>Create Post</h2>
          <form onSubmit={handleCreatePost} className="post-form">
            <input
              type="text"
              placeholder="Name"
              value={newPost.username}
              onChange={(e) => setNewPost({...newPost, username: e.target.value})}
            />
            <textarea
              placeholder="Match Kesa Chal Raha He.. *"
              value={newPost.problem}
              onChange={(e) => setNewPost({...newPost, problem: e.target.value})}
              required
              rows="3"
            />
            
            <div className="image-upload-section">
              <div className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPost({...newPost, image: e.target.files[0]})}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="upload-label">
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">Add Photo</span>
                </label>
              </div>
              {newPost.image && (
                <>
                  <span className="file-name">📷 {newPost.image.name}</span>
                  <span className="file-type-warning">
                    Supported: JPG, PNG, GIF, WebP, BMP, SVG
                  </span>
                </>
              )}
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Share Post'}
            </button>
          </form>
        </div>

        <div className="posts-feed">
          <h2>Recent Posts</h2>
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet. Be the first to share!</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {post.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="username">@{post.username}</div>
                      <div className="timestamp">
                        {formatTime(post.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="problem-content">
                  <p>{post.problem}</p>
                </div>

                {post.images.length > 0 && (
                  <div className="post-images">
                    {post.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image.image_url} 
                        alt="Post content" 
                        className="post-image"
                        onError={(e) => {
                          console.log('Image failed to load:', image.image_url);
                          e.target.style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                )}
                
                <div className="actions">
                  <div className="action" onClick={() => handleLike(post.id)}>
                    <span className="icon">👍</span>
                    <p>Like ({post.likes || 0})</p>
                  </div>

                  <div className="action" onClick={() => toggleComments(post.id)}>
                    <span className="icon">💬</span>
                    <p>Comment ({post.comments?.length || 0})</p>
                  </div>
                </div>

                {expandedComments[post.id] && (
                  <div className="comments-section">
                    <div className="add-comment">
                      <input
                        type="text"
                        placeholder="Your Name (optional)"
                        value={newComment[post.id + '-username'] || ''}
                        onChange={(e) => setNewComment({
                          ...newComment,
                          [post.id + '-username']: e.target.value
                        })}
                      />
                      <div className="comment-input-row">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={newComment[post.id] || ''}
                          onChange={(e) => setNewComment({
                            ...newComment,
                            [post.id]: e.target.value
                          })}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        />
                        <button onClick={() => handleAddComment(post.id)}>
                          Post
                        </button>
                      </div>
                    </div>

                    {getVisibleComments(post).map((comment, index) => (
                      <div key={comment.id || index} className="comment">
                        <strong>@{comment.username || 'Anonymous'}:</strong>
                        <span>{comment.comment}</span>
                        <small>{formatTime(comment.created_at)}</small>
                      </div>
                    ))}
                    
                    {post.comments && post.comments.length > 2 && (
                      <button 
                        className="show-more-btn"
                        onClick={() => toggleComments(post.id)}
                      >
                        {expandedComments[post.id] ? 'Show Less' : `Show ${post.comments.length - 2} More Comments`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
