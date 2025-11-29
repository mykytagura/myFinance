export const COLORS = {
    light: {
        primary: '#6366f1', // indigo-500
        secondary: '#a855f7', // purple-500
        accent: '#ec4899', // pink-500
        background: '#f9fafb', // gray-50
        surface: '#ffffff',
        text: {
            primary: '#111827', // gray-900
            secondary: '#6b7280', // gray-500
            tertiary: '#9ca3af', // gray-400
        },
        income: '#10b981', // green-500
        expense: '#ef4444', // red-500
        border: '#e5e7eb', // gray-200
    },
    dark: {
        primary: '#6366f1',
        secondary: '#a855f7',
        accent: '#ec4899',
        background: '#0f172a', // slate-900
        surface: '#1e293b', // slate-800
        surfaceLight: '#334155', // slate-700
        text: {
            primary: '#f8fafc', // slate-50
            secondary: '#94a3b8', // slate-400
            tertiary: '#64748b', // slate-500
        },
        income: '#34d399', // green-400
        expense: '#f87171', // red-400
        border: '#334155', // slate-700
    }
} as const

export const SPACING = {
    xs: 4,   // 0.25rem
    sm: 8,   // 0.5rem
    md: 16,  // 1rem
    lg: 24,  // 1.5rem
    xl: 32,  // 2rem
} as const;

export const BORDER_RADIUS = {
    sm: 8,   // 0.5rem
    md: 16,  // 1rem
    lg: 24,  // 1.5rem
    xl: 32,  // 2rem
} as const;

export const OPACITY = {
    active: 0.9
} as const
