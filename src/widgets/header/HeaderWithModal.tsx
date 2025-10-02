import React, { useState } from 'react';
import { Header } from './Header';
import { RegistrationModal } from '../../features/registration/RegistrationModal';

export const HeaderWithModal: React.FC = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleRegistrationComplete = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <>
      <Header />
      {isRegistrationModalOpen && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          onRegistrationComplete={handleRegistrationComplete}
        />
      )}
    </>
  );
};