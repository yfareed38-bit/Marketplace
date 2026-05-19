'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { getConversations, getMessages, sendMessage } from '@/actions/dashboard';
import styles from './page.module.css';

export default function MessagesPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadConversations() {
      const res = await getConversations();
      if (res.success && res.data) {
        setConversations(res.data);
        if (res.data.length > 0) {
          setActiveConvId(res.data[0].id);
        }
      }
      setLoading(false);
    }
    loadConversations();
  }, []);

  useEffect(() => {
    async function loadMessages() {
      if (!activeConvId) return;
      const res = await getMessages(activeConvId);
      if (res.success && res.data) {
        setMessages(res.data);
      }
    }
    loadMessages();
    // Optional: implement a polling mechanism here for real-time updates
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMsg.trim() || !activeConvId) return;
    
    const text = inputMsg;
    setInputMsg(''); // clear input early for UX
    
    // Optimistic UI update
    const optimisticMsg = {
      id: 'temp-' + Date.now(),
      senderId: (session?.user as any)?.id,
      receiverId: activeConvId,
      content: text,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimisticMsg]);
    
    const res = await sendMessage(activeConvId, text);
    if (!res.success) {
      // Revert optimistic update on failure (simplified)
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
      alert('Failed to send message');
    } else {
      // Update with real ID
      setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? res.data : m));
    }
  };

  const activeUser = conversations.find(c => c.id === activeConvId);

  return (
    <div className={styles.container}>
      <aside className={styles.conversationList}>
        <h2 className={styles.listTitle}>Messages</h2>
        {loading ? (
          <p style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>Loading...</p>
        ) : conversations.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>No conversations yet.</p>
        ) : (
          conversations.map((conv) => (
            <div 
              key={conv.id} 
              className={`${styles.convItem} ${conv.id === activeConvId ? styles.convActive : ''}`}
              onClick={() => setActiveConvId(conv.id)}
            >
              <div className={styles.convAvatar}>
                {conv.name.charAt(0)}
                {/* Simplified online dot */}
                {Math.random() > 0.5 && <span className={styles.onlineDot}></span>}
              </div>
              <div className={styles.convInfo}>
                <div className={styles.convHeader}>
                  <span className={styles.convName}>{conv.name}</span>
                  <span className={styles.convTime}>{new Date(conv.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <p className={styles.convLast}>{conv.lastMsg}</p>
              </div>
              {conv.unread > 0 && (
                <span className={styles.unreadBadge}>{conv.unread}</span>
              )}
            </div>
          ))
        )}
      </aside>

      <div className={styles.chatArea}>
        {activeUser ? (
          <>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatAvatar}>{activeUser.name.charAt(0)}</div>
              <div>
                <h4>{activeUser.name}</h4>
                <span className={styles.onlineStatus}>Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((msg: any) => {
                const isMe = msg.senderId === (session?.user as any)?.id;
                return (
                  <div key={msg.id} className={`${styles.msgBubble} ${isMe ? styles.msgMe : styles.msgThem}`}>
                    <p>{msg.content}</p>
                    <span className={styles.msgTime}>{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputArea}>
              <input 
                type="text" 
                placeholder="Type a message…" 
                className={styles.input} 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className={styles.sendBtn} onClick={handleSend}>Send ➤</button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted-foreground)' }}>
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
