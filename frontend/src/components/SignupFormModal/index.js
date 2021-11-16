import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './signupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup-button' onClick={() => setShowModal(true)}>SignUp</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
