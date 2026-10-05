// js/components.js

export function renderHeader(activePage) {
    return `
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2 text-[#20ACB3] font-bold text-2xl">
                <i class="bi bi-house-heart"></i>
                <a href="/">Ụlọ Ọma</a>
            </div>
            <nav class="hidden md:flex gap-6 text-[#5C6F70] font-medium">
                <a href="/properties.html" class="${activePage === 'properties' ? 'text-[#20ACB3]' : 'hover:text-[#20ACB3]'}">Properties</a>
                <a href="/services.html" class="${activePage === 'services' ? 'text-[#20ACB3]' : 'hover:text-[#20ACB3]'}">Services</a>
                <a href="/dashboard.html" class="${activePage === 'dashboard' ? 'text-[#20ACB3]' : 'hover:text-[#20ACB3]'}">Dashboard</a>
            </nav>
            <div class="flex items-center gap-4">
                <div id="notification-bell-container"></div>
                <a href="/login.html" class="bg-[#20ACB3] text-white px-6 py-2 rounded-[20px] hover:bg-black transition-colors font-medium">Log In</a>
            </div>
        </div>
    </header>
    `;
}

export function renderFooter() {
    return `
    <footer class="bg-[#0F3B3D] text-white py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div class="flex items-center gap-2 font-bold text-2xl mb-4 text-[#82E4E9]">
                    <i class="bi bi-house-heart"></i>
                    <span>Ụlọ Ọma</span>
                </div>
                <p class="text-sm text-gray-300">Your trusted partner for verified properties, seamless relocation, and smart living in Nigeria.</p>
            </div>
            <div>
                <h4 class="font-bold text-lg mb-4 text-[#82E4E9]">Quick Links</h4>
                <ul class="space-y-2 text-sm text-gray-300">
                    <li><a href="/properties.html" class="hover:text-white">Find a Home</a></li>
                    <li><a href="/moving.html" class="hover:text-white">Moving Services</a></li>
                    <li><a href="/rewards.html" class="hover:text-white">Get ₦20,000 Reward</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-lg mb-4 text-[#82E4E9]">Support</h4>
                <ul class="space-y-2 text-sm text-gray-300">
                    <li><a href="/faq.html" class="hover:text-white">FAQ</a></li>
                    <li><a href="/contact.html" class="hover:text-white">Contact Us</a></li>
                    <li><a href="/terms.html" class="hover:text-white">Terms of Service</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-lg mb-4 text-[#82E4E9]">Connect</h4>
                <div class="flex gap-4">
                    <a href="#" class="text-gray-300 hover:text-white text-xl"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="text-gray-300 hover:text-white text-xl"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="text-gray-300 hover:text-white text-xl"><i class="bi bi-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-[#196366] text-center text-sm text-gray-400">
            &copy; ${new Date().getFullYear()} Ụlọ Ọma. All rights reserved.
        </div>
    </footer>
    `;
}

export function renderPropertyCard(property) {
    const isVerified = property.verification_status && property.verification_status.property_verified;
    
    return `
    <div class="bg-white rounded-4xl shadow-lg overflow-hidden flex flex-col min-w-[307px] transition-transform hover:-translate-y-1">
        <div class="relative h-48 bg-gray-200">
            ${property.images && property.images.length > 0 
                ? `<img src="${property.images[0]}" alt="${property.title}" class="w-full h-full object-cover">`
                : `<div class="w-full h-full flex items-center justify-center text-gray-400"><i class="bi bi-image text-3xl"></i></div>`
            }
            ${isVerified ? `<div class="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><i class="bi bi-shield-check"></i> Verified</div>` : ''}
            <div class="absolute top-4 right-4 bg-white/90 text-[#0F3B3D] text-xs font-bold px-3 py-1 rounded-full">
                ${property.type}
            </div>
        </div>
        <div class="p-7 flex-1 flex flex-col">
            <div class="text-[#20ACB3] font-bold text-xl mb-1">₦${property.price.toLocaleString()} <span class="text-sm font-normal text-[#5C6F70]">/ ${property.rental_frequency}</span></div>
            <h3 class="font-bold text-[#0F3B3D] text-lg mb-2 line-clamp-1">${property.title}</h3>
            <p class="text-[#5C6F70] text-sm mb-4 flex items-start gap-1 line-clamp-2">
                <i class="bi bi-geo-alt mt-0.5 text-[#20ACB3]"></i> ${property.location}
            </p>
            <div class="flex items-center gap-4 text-sm text-[#5C6F70] mb-6 pb-4 border-b border-gray-100">
                <div class="flex items-center gap-1"><i class="bi bi-door-closed"></i> ${property.bedrooms} Beds</div>
                <div class="flex items-center gap-1"><i class="bi bi-droplet"></i> ${property.bathrooms} Baths</div>
            </div>
            <a href="/property.html?id=${property.id}" class="mt-auto block text-center w-full bg-gray-50 text-[#0F3B3D] py-2 rounded-[20px] font-medium hover:bg-[#20ACB3] hover:text-white transition-colors border border-gray-200 hover:border-transparent">
                View Details
            </a>
        </div>
    </div>
    `;
}

export function renderLoadingSpinner() {
    return `
    <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20ACB3]"></div>
    </div>
    `;
}

export function renderEmptyState(message = "No items found.") {
    return `
    <div class="text-center py-12 px-4 bg-gray-50 rounded-4xl border border-dashed border-gray-200">
        <div class="text-gray-300 text-5xl mb-4"><i class="bi bi-inbox"></i></div>
        <p class="text-[#5C6F70] font-medium">${message}</p>
    </div>
    `;
}

export function renderErrorState(message, retryCallbackName) {
    return `
    <div class="text-center py-12 px-4 bg-red-50 rounded-4xl border border-red-100">
        <div class="text-red-400 text-5xl mb-4"><i class="bi bi-exclamation-triangle"></i></div>
        <p class="text-red-800 font-medium mb-4">${message}</p>
        ${retryCallbackName ? `<button onclick="${retryCallbackName}()" class="bg-red-100 text-red-700 px-6 py-2 rounded-[20px] hover:bg-red-200 transition-colors">Try Again</button>` : ''}
    </div>
    `;
}

export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-[#20ACB3]'
    };
    const icons = {
        success: 'bi-check-circle',
        error: 'bi-exclamation-circle',
        info: 'bi-info-circle'
    };
    
    toast.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-[20px] shadow-lg flex items-center gap-3 z-50 transform translate-y-20 transition-transform duration-300`;
    toast.innerHTML = `<i class="bi ${icons[type]} text-xl"></i> <span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-20');
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-20');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

export function renderModal(title, content, actions = '') {
    return `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-4xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-bold text-xl text-[#0F3B3D]">${title}</h3>
                <button class="text-gray-400 hover:text-black transition-colors" onclick="this.closest('.fixed').remove()">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="p-6 overflow-y-auto">
                ${content}
            </div>
            ${actions ? `
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                ${actions}
            </div>
            ` : ''}
        </div>
    </div>
    `;
}
