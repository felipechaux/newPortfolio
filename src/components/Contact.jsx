import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const inputClass =
  'bg-white/[0.04] py-4 px-6 placeholder:text-taupe text-timberWolf rounded-lg border border-line font-medium transition-colors focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const { lang } = useLang();
  const tr = pt[lang].contact;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // sign up on emailjs.com (select the gmail service and connect your account).
    //click on create a new template then click on save.
    emailjs
      .send(
        'service_r77g6uq', // paste your ServiceID here (you'll get one when your service is created).
        'template_8mtok6j', // paste your TemplateID here (you'll find it under email templates).
        {
          from_name: form.name,
          to_name: 'Felipe', // put your name here.
          from_email: form.email,
          to_email: 'felchax@gmail.com', //put your email here.
          message: form.message,
        },
        'q3RoWKQusixcwHgIq' //paste your Public Key here. You'll get it in your profile section.
      )
      .then(
        () => {
          setLoading(false);
          setStatus('success');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          setStatus('error');
        }
      );
  };

  return (
    <div
      className="-mt-[8rem] xl:flex-row flex-col-reverse 
      flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-surface border border-line p-8 rounded-2xl">
        <p className={styles.sectionSubText}>{tr.sub}</p>
        <h3 className={styles.sectionHeadTextLight}>{tr.title}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6 font-poppins">
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-3">{tr.nameLabel}</span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={tr.namePlaceholder}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-3">{tr.emailLabel}</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={tr.emailPlaceholder}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-3">
              {tr.messageLabel}
            </span>
            <textarea
              required
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={tr.messagePlaceholder}
              className={`${inputClass} resize-none`}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 px-7 font-poppins text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              )}
              {loading ? tr.sending : tr.send}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`text-[14px] ${status === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
              {status === 'success' && tr.successMsg}
              {status === 'error' && tr.errorMsg}
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
