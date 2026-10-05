// js/moving.js
import { supabase } from './supabase.js';

export async function createMovingRequest(userId, oldAddress, newAddress, preferredDate) {
    const { data, error } = await supabase
        .from('moving_requests')
        .insert([{
            user_id: userId,
            old_address: oldAddress,
            new_address: newAddress,
            preferred_date: preferredDate,
            status: 'Moving Request Submitted'
        }])
        .select();
        
    if (error) throw error;
    return data[0];
}

export async function getMovingStatus(userId) {
    const { data, error } = await supabase
        .from('moving_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
    if (error) throw error;
    return data;
}

export async function updateMovingStatus(id, status) {
    const { data, error } = await supabase
        .from('moving_requests')
        .update({ status })
        .eq('id', id)
        .select();
        
    if (error) throw error;
    return data[0];
}

export function getMovingStatuses() {
    return [
        'Payment Confirmed', 
        'Moving Request Submitted', 
        'Moving Scheduled', 
        'Team Assigned', 
        'Pickup', 
        'In Transit', 
        'Delivered', 
        'Completed'
    ];
}
