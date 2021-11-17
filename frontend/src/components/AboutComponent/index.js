import React, { useState} from 'react';
import { Modal } from '../../context/Modal';
import AboutModal from './AboutComponentModal';
import './AboutComponentModal.css';

function About() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='about-button' onClick={() => setShowModal(true)}>About</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AboutModal />
        </Modal>
      )}
    </>
  );
}

export default About;
