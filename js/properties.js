// js/properties.js
import { supabase } from './supabase.js';

export async function getProperties(filters = {}) {
    let query = supabase.from('properties').select('*, property_verifications(*)');
    
    if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
    }
    if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
    }
    if (filters.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
    }
    if (filters.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms);
    }
    if (filters.propertyType) {
        query = query.eq('type', filters.propertyType);
    }
    if (filters.tenancy) {
        query = query.eq('rental_frequency', filters.tenancy);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    // In memory filter for amenities if needed
    let results = data;
    if (filters.amenities && filters.amenities.length > 0) {
        results = data.filter(prop => {
            const propAmenities = prop.amenities || [];
            return filters.amenities.every(am => propAmenities.includes(am));
        });
    }
    
    return results;
}

export async function getPropertyById(id) {
    const { data, error } = await supabase
        .from('properties')
        .select('*, property_verifications(*), profiles:landlord_id(full_name, phone)')
        .eq('id', id)
        .single();
        
    if (error) throw error;
    return data;
}

export async function createProperty(propertyData) {
    const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select();
        
    if (error) throw error;
    return data[0];
}

export async function updateProperty(id, propertyData) {
    const { data, error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id)
        .select();
        
    if (error) throw error;
    return data[0];
}

export function getPropertyTypes() {
    return [
        'Apartment', 
        'House', 
        'Studio', 
        'Duplex', 
        'Room',
        'Commercial',
        'Office',
        'Land'
    ];
}

export async function getVerificationStatus(propertyId) {
    const { data, error } = await supabase
        .from('property_verifications')
        .select('*')
        .eq('property_id', propertyId)
        .single();
        
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
    return data || null;
}
