import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with authentication
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// API Slice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Event', 'User', 'Theme'],
    endpoints: (builder) => ({
        // ========== EVENTS ==========
        // Get all events (public)
        getEvents: builder.query({
            query: () => '/events',
            providesTags: ['Event'],
        }),

        // Get event by name (public)
        getEventByName: builder.query({
            query: (eventName) => `/events/${encodeURIComponent(eventName)}`,
            providesTags: (result, error, eventName) => [{ type: 'Event', id: eventName }],
        }),

        // Get active events (public)
        getActiveEvents: builder.query({
            query: () => '/events/active',
            providesTags: ['Event'],
        }),

        // Create/Update event (protected)
        updateEvent: builder.mutation({
            query: (eventData) => ({
                url: '/events',
                method: 'PUT',
                body: eventData,
            }),
            invalidatesTags: ['Event'],
        }),

        // Delete event (protected)
        deleteEvent: builder.mutation({
            query: (eventName) => ({
                url: `/events/${encodeURIComponent(eventName)}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event'],
        }),

        // ========== USERS ==========
        // Get all users (protected)
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['User'],
        }),

        // Update user (protected)
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        // Delete user (protected)
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        // Toggle user status (protected)
        toggleUserStatus: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/toggle-status`,
                method: 'PATCH',
            }),
            invalidatesTags: ['User'],
        }),

        // ========== THEMES ==========
        // Get active theme (public)
        getActiveTheme: builder.query({
            query: () => '/themes/active',
            providesTags: ['Theme'],
        }),

        // Get all themes (protected)
        getThemes: builder.query({
            query: () => '/themes',
            providesTags: ['Theme'],
        }),

        // Create theme (protected)
        createTheme: builder.mutation({
            query: (themeData) => ({
                url: '/themes',
                method: 'POST',
                body: themeData,
            }),
            invalidatesTags: ['Theme'],
        }),

        // Update theme (protected)
        updateTheme: builder.mutation({
            query: ({ id, data }) => ({
                url: `/themes/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Theme'],
        }),

        // Set active theme (protected)
        setActiveTheme: builder.mutation({
            query: (id) => ({
                url: `/themes/${id}/activate`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Theme'],
        }),

        // Delete theme (protected)
        deleteTheme: builder.mutation({
            query: (id) => ({
                url: `/themes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Theme'],
        }),
    }),
});

// Export hooks for usage in components
export const {
    // Events
    useGetEventsQuery,
    useGetEventByNameQuery,
    useGetActiveEventsQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
    
    // Users
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useToggleUserStatusMutation,
    
    // Themes
    useGetActiveThemeQuery,
    useGetThemesQuery,
    useCreateThemeMutation,
    useUpdateThemeMutation,
    useSetActiveThemeMutation,
    useDeleteThemeMutation,
} = apiSlice;
