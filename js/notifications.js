// js/notifications.js
import { supabase } from './supabase.js';

export async function getNotifications(userId) {
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
    if (error) throw error;
    return data;
}

export async function markAsRead(notificationId) {
    const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .select();
        
    if (error) throw error;
    return data[0];
}

export async function createNotification(userId, type, title, message, link = '') {
    const { data, error } = await supabase
        .from('notifications')
        .insert([{
            user_id: userId,
            type,
            title,
            message,
            link,
            read: false
        }])
        .select();
        
    if (error) throw error;
    return data[0];
}

export function renderNotificationBell(unreadCount = 0) {
    return `
    <div class="relative cursor-pointer hover:text-[#20ACB3] text-[#5C6F70] transition-colors" id="nav-notification-bell">
        <i class="bi bi-bell text-xl"></i>
        ${unreadCount > 0 ? `
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                ${unreadCount > 9 ? '9+' : unreadCount}
            </span>
        ` : ''}
    </div>
    `;
}
