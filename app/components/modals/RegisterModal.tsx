// 'use client';
// import React from 'react';
// import Modal from './Modal';
// import FormLayout from '../form/FormLayout';
// import useRegisterModal from '@/app/utils/hooks/useRegisterModal';
// import Button from '../Button';
// import { FcGoogle } from 'react-icons/fc';
// import { signIn } from 'next-auth/react';
// import { AiFillGithub } from 'react-icons/ai';

// type data = {
//   email: string;
//   password: string;
// };

// const RegisterModal: React.FC = () => {
//   const [isLoading, setLoading] = React.useState(true);
//   const { isOpen, showModal, onClose } = useRegisterModal();

//   const handleSubmit = async (data: data) => {
//     setLoading(true);

//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         onClose();
//       } else {
//         throw new Error('Failed to register user');
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       showModal={showModal}
//       onClose={onClose}
//       title="Sign up"
//       isLoading={isLoading}
//     >
//       <FormLayout onSubmit={handleSubmit} />
//       <Button
//         outline
//         icon={FcGoogle}
//         label="Sign in with google"
//         onClick={() => signIn('google')}
//       />
//       <Button
//         outline
//         icon={AiFillGithub}
//         label="Sign in with github"
//         onClick={() => signIn('github')}
//       />
//     </Modal>
//   );
// };

// export default RegisterModal;
