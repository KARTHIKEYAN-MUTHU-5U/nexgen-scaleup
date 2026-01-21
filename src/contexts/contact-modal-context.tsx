'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ContactModal } from '@/components/modals/contact-modal';

interface ContactModalContextType {
    openContactModal: (initialServiceType?: string) => void;
    closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [serviceType, setServiceType] = useState<string>('');

    const openContactModal = (initialServiceType = '') => {
        setServiceType(initialServiceType);
        setIsOpen(true);
    };

    const closeContactModal = () => {
        setIsOpen(false);
        setServiceType('');
    };

    return (
        <ContactModalContext.Provider value={{ openContactModal, closeContactModal }}>
            {children}
            <ContactModal
                isOpen={isOpen}
                onClose={closeContactModal}
                initialServiceType={serviceType}
            />
        </ContactModalContext.Provider>
    );
}

export function useContactModal() {
    const context = useContext(ContactModalContext);
    if (context === undefined) {
        throw new Error('useContactModal must be used within a ContactModalProvider');
    }
    return context;
}
