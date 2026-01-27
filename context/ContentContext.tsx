import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types broadly since structure is dynamic based on JSON
export type ContentData = any;

interface ContentContextType {
    content: ContentData;
    loading: boolean;
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ContentData>(null);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            // Add timestamp to prevent caching
            const response = await fetch(`/content.json?t=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error('Failed to load content');
            }
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error loading content:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <ContentContext.Provider value={{ content, loading, refreshContent: fetchContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
