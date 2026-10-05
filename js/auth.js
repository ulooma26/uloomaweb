// js/auth.js
import { supabase } from './supabase.js';

export async function signUp(email, password, fullName, phone, preferredLocation) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone,
                preferred_location: preferredLocation
            }
        }
    });
    if (error) throw error;
    
    // The profile is usually created via a database trigger after signup
    return data;
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session?.user || null;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '/login.html';
    }
    return user;
}

export async function getUserProfile() {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
    if (error) throw error;
    return data;
}

export async function updateProfile(profileData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    
    const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', user.id)
        .select();
        
    if (error) throw error;
    return data[0];
}

export async function isAdmin() {
    const profile = await getUserProfile();
    return profile?.role === 'admin';
}

export async function isTenant() {
    const profile = await getUserProfile();
    return profile?.role === 'tenant' || profile?.role === 'admin';
}

export async function isLandlord() {
    const profile = await getUserProfile();
    return profile?.role === 'landlord' || profile?.role === 'admin';
}
