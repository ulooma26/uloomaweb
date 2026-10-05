// js/reservations.js
import { supabase } from './supabase.js';

export async function createReservation(propertyId, userId, preferredDate) {
    const { data, error } = await supabase
        .from('reservations')
        .insert([{
            property_id: propertyId,
            user_id: userId,
            preferred_date: preferredDate,
            status: 'Requested'
        }])
        .select();
        
    if (error) throw error;
    return data[0];
}

export async function getReservations(userId) {
    const { data, error } = await supabase
        .from('reservations')
        .select('*, properties(*), representatives(name, phone)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
    if (error) throw error;
    return data;
}

export async function updateReservationStatus(id, status) {
    const { data, error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id)
        .select();
        
    if (error) throw error;
    return data[0];
}

export function getReservationStatuses() {
    return [
        'Requested', 
        'Representative Assigned', 
        'Viewing Scheduled', 
        'Viewed', 
        'Proceeding', 
        'Cancelled', 
        'Completed'
    ];
}
