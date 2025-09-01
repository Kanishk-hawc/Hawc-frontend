import React, { useState, useEffect } from "react";
import { FiBell, FiCheck, FiTrash2, FiFilter,  } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { useHistory } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [, setHasUnread] = useState(false);
  const [, setIsPulsing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    // Check if there are unread notifications
    const unread = notifications.some(n => !n.isRead);
    setHasUnread(unread);
    
    // Trigger pulse animation when there are unread notifications
    if (unread) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const loadNotifications = () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Test Available',
        message: 'Weekly physics test is now available. You can take it from the Tests section.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: true,
        type: 'info'
      },
      {
        id: '2',
        title: 'Assignment Reminder',
        message: 'Your chemistry assignment is due tomorrow. Please submit it before the deadline.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        isRead: false,
        type: 'warning'
      },
      {
        id: '3',
        title: 'Subscription Update',
        message: 'Your premium subscription has been activated. You now have access to all features.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        type: 'success'
      },
      {
        id: '4',
        title: 'New Content Added',
        message: 'New practice questions have been added to the Biology section.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        isRead: false,
        type: 'info'
      }
    ];
    
    setNotifications(mockNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FiBell className="mr-2" />
          Notifications
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="px-3 py-1 border rounded-md dark:bg-gray-800 dark:text-white appearance-none pr-8"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
            </select>
            <FiFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          </div>
          
          {notifications.some(n => !n.isRead) && (
            <button 
              onClick={markAllAsRead}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
            >
              <FiCheck className="mr-1" />
              Mark all as read
            </button>
          )}
          
          {notifications.length > 0 && (
            <button 
              onClick={clearAllNotifications}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
            >
              <FiTrash2 className="mr-1" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <FiBell size={48} className="mx-auto mb-4 opacity-50" />
          <p>No notifications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                notification.isRead 
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 animate-pulse'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      notification.type === 'info' ? 'bg-blue-500' :
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <h3 className="font-semibold text-lg">{notification.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors flex items-center"
                    >
                      <FiCheck size={12} className="mr-1" />
                      Mark read
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors flex items-center"
                  >
                    <FiTrash2 size={12} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Notification Bell Component with Animations
const NotificationBell: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    // Load notifications (in a real app, this would come from a global state or API)
    const mockNotifications: Notification[] = [
      {
        id: '2',
        title: 'Assignment Reminder',
        message: 'Your chemistry assignment is due tomorrow.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        isRead: false,
        type: 'warning'
      },
      {
        id: '4',
        title: 'New Content Added',
        message: 'New practice questions have been added.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        isRead: false,
        type: 'info'
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    // Check if there are unread notifications
    const unread = notifications.some(n => !n.isRead);
    setHasUnread(unread);
    
    // Trigger animations when there are unread notifications
    if (unread) {
      // Initial pulse animation
      setIsPulsing(true);
      const pulseTimer = setTimeout(() => setIsPulsing(false), 2000);
      
      // Occasional bounce animation every 10 seconds
      const bounceInterval = setInterval(() => {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 1000);
      }, 10000);
      
      return () => {
        clearTimeout(pulseTimer);
        clearInterval(bounceInterval);
      };
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <button
      onClick={() => history.push("/notifications")}
      className={`relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
        isPulsing ? "animate-pulse" : ""
      }`}
    >
      <FaBell className={`text-xl ${isBouncing ? "animate-bounce" : ""} ${isDarkMode ? "text-white" : "text-gray-700"}`} />
      
      {hasUnread && (
        <>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export { NotificationBell };
export default NotificationsPage;