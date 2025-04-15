import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 1200));
    reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-xl mx-auto px-4">
        <motion.h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-8 text-center"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Contact
        </motion.h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-4 md:gap-6 animate-in fade-in duration-700">
          <div>
            <input {...register('name')} placeholder="Name" className={`w-full px-4 py-3 rounded-lg border text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300 ${errors.name ? 'border-red-500' : ''}`} />
            {errors.name && <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.name.message}</motion.p>}
          </div>
          <div>
            <input {...register('email')} placeholder="Email" className={`w-full px-4 py-3 rounded-lg border text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`} />
            {errors.email && <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.email.message}</motion.p>}
          </div>
          <div>
            <textarea {...register('message')} rows={5} placeholder="Message" className={`w-full px-4 py-3 rounded-lg border text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-300 ${errors.message ? 'border-red-500' : ''}`} />
            {errors.message && <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.message.message}</motion.p>}
          </div>
          <motion.button
            type="submit"
            className="mt-2 px-8 py-3 rounded-full bg-indigo-500 text-white font-bold shadow-lg hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 disabled:opacity-60"
            whileHover={{ scale: isValid && !isSubmitting ? 1.06 : 1 }}
            whileTap={{ scale: 0.97 }}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : isSubmitSuccessful ? 'Sent!' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
