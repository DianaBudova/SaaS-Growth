import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                brand: {
                    // Base backgrounds
                    bg: '#ffffff',               // Main background (app layout)
                    sidebar: '#1c1917',          // Sidebar & header background
                    surface: '#f9fafb',          // Light UI blocks (cards, panels)

                    // Primary button & actions
                    primary: '#3730a3',          // Primary action (CTA)
                    primaryHover: '#4338ca',     // Hover state for primary
                    primaryLight: '#6366f1',     // Accent tone (borders, links)
                    primaryText: '#ffffff',      // Text on primary

                    // Secondary button
                    secondary: '#292524',        // Secondary button background
                    secondaryHover: '#3f3f3f',   // Hover for secondary
                    secondaryText: '#ffffff',    // Text on secondary
                    secondaryBorder: '#262626',  // Border on secondary

                    // Text colors
                    textDark: '#1c1917',         // Text on light background
                    textLight: '#f5f5f4',        // Text on dark background
                    textMuted: '#a8a29e',        // Secondary / muted text
                    textPlaceholder: '#d6d3d1',  // Placeholder in inputs/forms

                    // Borders and dividers
                    border: '#e5e7eb',           // Neutral border (on white)
                    borderDark: '#262626',       // Border on dark background
                    divider: '#d1d5db',          // Divider lines

                    // States
                    danger: '#dc2626',           // Error / destructive action
                    dangerBg: '#fee2e2',         // Background for error alert
                    success: '#10b981',          // Success status
                    successBg: '#d1fae5',        // Background for success alert
                    warning: '#facc15',          // Warning color
                    warningBg: '#fef3c7',        // Background for warning
                    info: '#3b82f6',             // Informational color
                    infoBg: '#dbeafe',           // Background for info alerts

                    // Disabled / inactive states
                    disabled: '#9ca3af',         // Disabled text/icons
                    disabledBg: '#f3f4f6',       // Disabled element background

                    // Misc
                    highlight: '#c7d2fe',        // Highlight/focus tone
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
