import React from 'react';
import styles from './page.module.css';

const CONVERSATIONS = [
  { id: 1, name: 'Sarah Ahmed', lastMsg: 'Is the price negotiable?', time: '5m', ad: 'iPhone 15 Pro Max', unread: 2, online: true },
  { id: 2, name: 'Ali Hassan', lastMsg: 'Can I see the item today?', time: '1h', ad: 'Gaming Chair', unread: 0, online: true },
  { id: 3, name: 'Zara Khan', lastMsg: 'Okay, I will transfer the amount now.', time: '3h', ad: 'Canon EOS R5', unread: 0, online: false },
  { id: 4, name: 'Omar Farooq', lastMsg: 'Thanks for the quick response!', time: '1d', ad: 'Trek Bike', unread: 0, online: false },
];

const MESSAGES = [
  { id: 1, sender: 'them', text: 'Hi! Is the iPhone still available?', time: '10:32 AM' },
  { id: 2, sender: 'me', text: 'Yes, it is! Barely used, 2 months old.', time: '10:35 AM' },
  { id: 3, sender: 'them', text: 'Is the price negotiable?', time: '10:38 AM' },
  { id: 4, sender: 'me', text: 'I can do $1,150 for a quick sale.', time: '10:40 AM' },
];

export default function MessagesPage() {
  return (
    <div className={styles.container}>
      <aside className={styles.conversationList}>
        <h2 className={styles.listTitle}>Messages</h2>
        {CONVERSATIONS.map((conv) => (
          <div key={conv.id} className={`${styles.convItem} ${conv.id === 1 ? styles.convActive : ''}`}>
            <div className={styles.convAvatar}>
              {conv.name.charAt(0)}
              {conv.online && <span className={styles.onlineDot}></span>}
            </div>
            <div className={styles.convInfo}>
              <div className={styles.convHeader}>
                <span className={styles.convName}>{conv.name}</span>
                <span className={styles.convTime}>{conv.time}</span>
              </div>
              <p className={styles.convLast}>{conv.lastMsg}</p>
              <span className={styles.convAd}>{conv.ad}</span>
            </div>
            {conv.unread > 0 && (
              <span className={styles.unreadBadge}>{conv.unread}</span>
            )}
          </div>
        ))}
      </aside>

      <div className={styles.chatArea}>
        {/* Chat Header */}
        <div className={styles.chatHeader}>
          <div className={styles.chatAvatar}>S</div>
          <div>
            <h4>Sarah Ahmed</h4>
            <span className={styles.onlineStatus}>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {MESSAGES.map((msg) => (
            <div key={msg.id} className={`${styles.msgBubble} ${msg.sender === 'me' ? styles.msgMe : styles.msgThem}`}>
              <p>{msg.text}</p>
              <span className={styles.msgTime}>{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input type="text" placeholder="Type a message…" className={styles.input} />
          <button className={styles.sendBtn}>Send ➤</button>
        </div>
      </div>
    </div>
  );
}
