// js/components.js — Reusable UI Components for Ụlọ Ọma

export function renderBrandLockup(theme = 'dark') {
    const isDarkBg = theme === 'white' || theme === 'light-text';
    const textColor = isDarkBg ? 'text-white' : 'text-[#0F3B3D]';
    const taglineColor = isDarkBg ? 'text-[#82E4E9]' : 'text-[#0F3B3D]';
    const logoSrc = isDarkBg ? './images/Logo-white.PNG' : './images/Logo.PNG';

    return `
    <div class="cursor-pointer flex flex-col group" onclick="window.location.href='index.html'">
        <div class="flex items-center gap-2">
            <img src="${logoSrc}" alt="Ụlọ Ọma" class="h-11 md:h-12 w-auto object-contain" />
        </div>
    </div>
    `;
}

export function renderHeader(activePage = '') {
    const navItems = [
        { name: 'Home', href: 'index.html', key: 'home' },
        { name: 'Explore', href: 'explore.html', key: 'explore' },
        { name: 'How It Works', href: 'how-it-works.html', key: 'how-it-works' },
        { name: '₦20,000 Reward', href: 'moving-out.html', key: 'reward' },
        { name: 'About Us', href: 'about.html', key: 'about' },
        { name: 'Contact', href: 'contact.html', key: 'contact' },
    ];

    const navLinksHtml = navItems.map(item => `
        <a href="${item.href}" class="${activePage === item.key ? 'text-[#20ACB3] font-bold' : 'text-[#0F3B3D] hover:text-[#20ACB3]'} transition-colors">
            ${item.name}
        </a>
    `).join('');

    const mobileLinksHtml = navItems.map(item => `
        <a href="${item.href}" class="text-xl font-semibold ${activePage === item.key ? 'text-[#20ACB3]' : 'text-gray-800 hover:text-[#20ACB3]'} transition-colors">
            ${item.name}
        </a>
    `).join('');

    return `
    <header class="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <!-- Brand Logo & Tagline -->
            <div class="cursor-pointer flex flex-col" onclick="window.location.href='index.html'">
                <img src="./images/Logo.PNG" alt="Ụlọ Ọma ...your comfort, our priority." class="h-11 md:h-13 w-auto object-contain" />
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center gap-8 text-[16px] font-medium">
                ${navLinksHtml}
            </nav>

            <!-- Actions -->
            <div class="hidden sm:flex items-center gap-4">
                <a href="list-property.html" class="text-sm font-semibold text-[#0F3B3D] hover:text-[#20ACB3] px-3 py-2 transition-colors">
                    <i class="bi bi-plus-circle mr-1 text-[#20ACB3]"></i> List Property
                </a>
                <a href="tenant-dashboard.html" class="bg-[#20ACB3] text-white px-5 py-2.5 rounded-[20px] hover:bg-black transition-all text-sm font-medium shadow-sm flex items-center gap-2">
                    <i class="bi bi-person-circle"></i> Dashboard
                </a>
            </div>

            <!-- Mobile Menu Toggle Button -->
            <button id="menu-toggle-btn" class="lg:hidden text-3xl text-[#20ACB3] focus:outline-none p-1" aria-label="Toggle Navigation">
                <i id="menu-hamburger-icon" class="bi bi-list"></i>
                <i id="menu-close-icon" class="bi bi-x-lg hidden"></i>
            </button>
        </div>

        <!-- Mobile Drawer Menu -->
        <div id="mobile-nav-drawer" class="fixed inset-0 top-[73px] bg-white hidden z-40 flex-col p-6 overflow-y-auto space-y-6 shadow-2xl lg:hidden">
            <div class="flex flex-col space-y-5 border-b border-gray-100 pb-6">
                ${mobileLinksHtml}
            </div>
            <div class="flex flex-col gap-3 pt-2">
                <a href="list-property.html" class="w-full text-center py-3 rounded-2xl border border-[#20ACB3] text-[#20ACB3] font-semibold">
                    <i class="bi bi-plus-circle mr-1"></i> List a Property
                </a>
                <a href="tenant-dashboard.html" class="w-full text-center py-3 rounded-2xl bg-[#20ACB3] text-white font-semibold shadow-md">
                    <i class="bi bi-person-circle mr-1"></i> My Dashboard
                </a>
                <a href="signup.html" class="w-full text-center py-3 rounded-2xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200">
                    Create Account
                </a>
            </div>
        </div>
    </header>
    `;
}

export function renderFooter() {
    return `
    <footer class="bg-[#0F3B3D] text-white pt-16 pb-12 mt-auto relative overflow-hidden border-t-4 border-[#20ACB3]">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Top Callout Banner -->
            <div class="bg-gradient-to-r from-[#196366] to-[#0F3B3D] border border-white/10 rounded-3xl p-8 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="max-w-xl text-center md:text-left">
                    <span class="inline-block bg-[#20ACB3]/30 text-[#82E4E9] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                        <i class="bi bi-truck mr-1"></i> Find your home. We help you move in.
                    </span>
                    <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">Ready to find your verified home?</h3>
                    <p class="text-sm md:text-base text-gray-200">Explore verified rentals with free viewing transport and 100% free relocation included on every payment.</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <a href="explore.html" class="bg-[#20ACB3] hover:bg-black text-white px-7 py-3.5 rounded-[20px] font-semibold transition-all shadow-md text-sm md:text-base">
                        Explore Homes
                    </a>
                    <a href="moving-out.html" class="bg-white/10 hover:bg-white hover:text-[#0F3B3D] text-white border border-white/30 px-6 py-3.5 rounded-[20px] font-semibold transition-all text-sm md:text-base">
                        Get ₦20,000 Reward
                    </a>
                </div>
            </div>

            <!-- Main Footer Columns -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
                <!-- Col 1: Brand & Tagline -->
                <div class="space-y-4">
                    <div class="cursor-pointer" onclick="window.location.href='index.html'">
                        <img src="./images/Logo-white.PNG" alt="Ụlọ Ọma ...your comfort, our priority." class="h-12 w-auto object-contain" />
                    </div>
                    <p class="text-sm text-gray-300 leading-relaxed">
                        Nigeria's premier managed property platform. Verified listings, free inspection transport, escrow-grade rental payments, and 100% free relocation fulfillment.
                    </p>
                    <div class="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-[#82E4E9]">
                        <i class="bi bi-shield-check text-base text-[#20ACB3]"></i>
                        <span>CAC Verified Entity — RC: 7894120</span>
                    </div>
                    <div class="flex gap-4 text-lg text-gray-300 pt-2">
                        <a href="#" class="hover:text-[#20ACB3] transition"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="hover:text-[#20ACB3] transition"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="hover:text-[#20ACB3] transition"><i class="bi bi-twitter-x"></i></a>
                        <a href="#" class="hover:text-[#20ACB3] transition"><i class="bi bi-linkedin"></i></a>
                        <a href="https://wa.me/2348000000000" target="_blank" class="hover:text-green-400 transition"><i class="bi bi-whatsapp"></i></a>
                    </div>
                </div>

                <!-- Col 2: Quick Links -->
                <div class="space-y-4">
                    <h4 class="text-[#82E4E9] font-bold text-base tracking-wide uppercase">Property Platform</h4>
                    <ul class="space-y-2.5 text-sm text-gray-300">
                        <li><a href="explore.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> Verified Homes</a></li>
                        <li><a href="explore.html?type=1bed" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> 1 Bedroom Apartments</a></li>
                        <li><a href="explore.html?type=2bed" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> 2 Bedroom Flats</a></li>
                        <li><a href="explore.html?type=3bed" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> 3+ Bedroom Duplexes</a></li>
                        <li><a href="explore.html?tenancy=short" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> Short-Let Rentals</a></li>
                        <li><a href="list-property.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> Landlord Listing Portal</a></li>
                    </ul>
                </div>

                <!-- Col 3: Services & Rewards -->
                <div class="space-y-4">
                    <h4 class="text-[#82E4E9] font-bold text-base tracking-wide uppercase">Core Services</h4>
                    <ul class="space-y-2.5 text-sm text-gray-300">
                        <li><a href="how-it-works.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-chevron-right text-xs text-[#20ACB3]"></i> How Ụlọ Ọma Works</a></li>
                        <li><a href="moving-out.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-gift text-xs text-[#20ACB3]"></i> ₦20,000 Relocation Reward</a></li>
                        <li><a href="tenant-dashboard.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-truck text-xs text-[#20ACB3]"></i> 100% Free Moving Tracker</a></li>
                        <li><a href="card-payment.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-credit-card text-xs text-[#20ACB3]"></i> ₦2,000 Verified Access Pass</a></li>
                        <li><a href="about.html#cac-section" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-patch-check text-xs text-[#20ACB3]"></i> CAC Legal Credentials</a></li>
                        <li><a href="admin/index.html" class="hover:text-white transition flex items-center gap-1.5"><i class="bi bi-lock text-xs text-[#20ACB3]"></i> Staff Operations Hub</a></li>
                    </ul>
                </div>

                <!-- Col 4: Trust & Contact -->
                <div class="space-y-4">
                    <h4 class="text-[#82E4E9] font-bold text-base tracking-wide uppercase">Support & Office</h4>
                    <ul class="space-y-3 text-sm text-gray-300">
                        <li class="flex items-start gap-2.5">
                            <i class="bi bi-geo-alt text-[#20ACB3] text-lg shrink-0 mt-0.5"></i>
                            <span>Brass Junction / Aba-Owerri Rd, Aba, Abia State, Nigeria</span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <i class="bi bi-telephone text-[#20ACB3] text-base shrink-0"></i>
                            <span>+234 (0) 800 856 6621</span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <i class="bi bi-envelope text-[#20ACB3] text-base shrink-0"></i>
                            <span>support@ulooma.com</span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <i class="bi bi-clock text-[#20ACB3] text-base shrink-0"></i>
                            <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Copyright & Legal -->
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
                <p>&copy; ${new Date().getFullYear()} Ụlọ Ọma. All rights reserved. ...your comfort, our priority.</p>
                <div class="flex gap-6">
                    <a href="about.html" class="hover:text-white transition">Privacy Policy</a>
                    <a href="about.html" class="hover:text-white transition">Terms of Service</a>
                    <a href="contact.html" class="hover:text-white transition">Safety Standards</a>
                </div>
            </div>
        </div>
    </footer>
    `;
}

export function initMobileMenu() {
    const btn = document.getElementById('menu-toggle-btn') || document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer') || document.getElementById('mobile-menu');
    const burger = document.getElementById('menu-hamburger-icon') || document.getElementById('hamburger');
    const closeX = document.getElementById('menu-close-icon') || document.getElementById('close-x');

    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
        const isHidden = drawer.classList.contains('hidden');
        if (isHidden) {
            drawer.classList.remove('hidden');
            drawer.classList.add('flex');
            if (burger) burger.classList.add('hidden');
            if (closeX) closeX.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            drawer.classList.add('hidden');
            drawer.classList.remove('flex');
            if (burger) burger.classList.remove('hidden');
            if (closeX) closeX.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-[#0F3B3D] border-l-4 border-green-400',
        error: 'bg-red-600 border-l-4 border-red-300',
        info: 'bg-[#0F3B3D] border-l-4 border-[#20ACB3]'
    };
    const icons = {
        success: 'bi-check-circle-fill text-green-400',
        error: 'bi-exclamation-triangle-fill text-red-300',
        info: 'bi-info-circle-fill text-[#20ACB3]'
    };
    
    toast.className = `fixed bottom-5 right-5 ${colors[type] || colors.info} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[9999] transform translate-y-24 transition-all duration-300 max-w-md text-sm font-medium`;
    toast.innerHTML = `<i class="bi ${icons[type] || icons.info} text-xl shrink-0"></i> <span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-24');
    });
    
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Auto-run if DOM is ready
if (typeof window !== 'undefined') {
    window.renderHeader = renderHeader;
    window.renderFooter = renderFooter;
    window.showToast = showToast;
    document.addEventListener('DOMContentLoaded', initMobileMenu);
}
