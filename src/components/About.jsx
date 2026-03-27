import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
    className="xs:w-[250px] w-full p-[1px] rounded-[20px]"
    style={{
      background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(99,102,241,0.15), rgba(255,255,255,0.05))',
    }}
  >
    <div
      className="rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <img src={icon} alt={title} className="w-16 h-16 object-contain" />
      <h3 className="text-timberWolf text-[18px] font-bold text-center font-poppins">{title}</h3>
    </div>
  </motion.div>
);

const About = () => {
  const { lang } = useLang();
  const tr = pt[lang].about;

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>{tr.sub}</p>
        <h2 className={styles.sectionHeadTextLight}>{tr.title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px] font-poppins">
        {tr.bio}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      {/* Mentoring promo */}
      <motion.div variants={fadeIn('up', 'spring', 0.6, 0.75)} className="mt-16">
        <div
          className="rounded-[20px] p-[1px]"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(99,102,241,0.25), transparent)' }}
        >
          <div
            className="rounded-[20px] px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'rgba(124,58,237,0.07)' }}
          >
            <div>
              <p className="font-poppins font-black text-[22px] text-timberWolf mb-1">
                {tr.mentoringTitle}
              </p>
              <p className="font-poppins text-[15px] text-taupe leading-relaxed max-w-lg">
                {tr.mentoringDesc}
              </p>
            </div>
            <Link
              to="/mentoring"
              className="flex-shrink-0 font-poppins font-bold text-[15px] hover:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                color: '#fff', padding: '12px 28px', borderRadius: '12px',
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
              }}
            >
              {tr.mentoringCta}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
