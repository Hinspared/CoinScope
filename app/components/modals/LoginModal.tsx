// 'use client';
// import React from 'react';
// import Modal from './Modal';
// import FormLayout from '../form/FormLayout';
// // import { signIn } from 'next-auth/react';
// import Button from '../Button';
// import { FcGoogle } from 'react-icons/fc';
// import { AiFillGithub } from 'react-icons/ai';
// import useLoginModal from '@/app/utils/hooks/useLoginModal';
// import { toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// type data = {
//   email: string;
//   password: string;
// };

// const LoginModal: React.FC = () => {
//   const router = useRouter();
//   const [isLoading, setLoading] = React.useState(false);
//   const { isOpen, showModal, onClose } = useLoginModal();

//   const handleSubmit = (data: data) => {
//     setLoading(true);

//     signIn('credentials', {
//       ...data,
//       redirect: false,
//     })
//       .then((callback) => {
//         setLoading(false);

//         if (callback?.ok) {
//           toast.success('Logged in');
//           router.refresh();
//           onClose();
//         }
//         if (callback?.error) {
//           toast.error(callback.error);
//           onClose();
//         }
//       })
//       .catch((error) => {
//         toast.error(error);
//       });
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       showModal={showModal}
//       onClose={onClose}
//       title="Login"
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

// export default LoginModal;
