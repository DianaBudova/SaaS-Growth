import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Elements stripe={stripePromise}>
                <App {...props} />
            </Elements>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
