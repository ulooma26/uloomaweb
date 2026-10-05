// js/rewards.js
import { supabase } from './supabase.js';

export async function submitMovingOutListing(data) {
    // data includes: user_id, property_address, property_type, bedrooms, bathrooms, rent, available_date, features, photos, landlord_name, landlord_contact, description
    const { data: result, error } = await supabase
        .from('moving_out_listings')
        .insert([{
            ...data,
            status: 'Submitted',
            reward_status: 'Submitted'
        }])
        .select();
        
    if (error) throw error;
    return result[0];
}

export async function getRewardStatus(userId) {
    const { data, error } = await supabase
        .from('moving_out_listings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
    if (error) throw error;
    return data;
}

export function getRewardStatuses() {
    return [
        'Submitted', 
        'Under Review', 
        'Approved', 
        'New Tenant Found', 
        'Payment Confirmed', 
        'Move-in Confirmed', 
        'Reward Eligible', 
        'Reward Processing', 
        'Reward Paid'
    ];
}
