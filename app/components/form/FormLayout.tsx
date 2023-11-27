'use client';
import React from 'react';
import { z } from 'zod';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Input from './Input';
import Button from '../Button';

interface InputProps {
  onSubmit: (values: { email: string; password: string }) => void;
}

const Schema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .nonempty({ message: 'Password is required' }),
});

const FormLayout: React.FC<InputProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(Schema)}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form
          className="flex justify-center flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <div className="w-full justify-center flex flex-col items-center py-3">
            <h1 className="mr-auto text-xl my-6 font-semibold">
              Welcome to Coinscope
            </h1>
            <Input
              type="email"
              name="email"
              errors={errors.email}
              touched={touched.email}
            />
            <Input
              type="password"
              name="password"
              errors={errors.password}
              touched={touched.password}
            />
            <Button label="Submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormLayout;
