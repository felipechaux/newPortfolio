import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { resume } from '../assets';
import { textVariant } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(124,58,237,0.2)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(8px)',
      color: '#d4d4d8',
    }}
    contentArrowStyle={{ borderRight: '7px solid rgba(124,58,237,0.4)' }}
    date={
      <h3 className="text-taupe text-[15px] font-semibold font-poppins">
        {experience.date}
      </h3>
    }
    iconStyle={{
      background: experience.iconBg,
      boxShadow: '0 0 0 4px rgba(124,58,237,0.3), inset 0 2px 0 rgba(0,0,0,0.08)',
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        {experience.icon ? (
          <img src={experience.icon} alt={experience.company_name} className="w-[60%] h-[60%] object-contain" />
        ) : (
          // No logo asset yet: show the company initials.
          <span className="font-poppins text-[15px] font-bold tracking-wide text-violet-200" aria-hidden="true">
            {experience.iconText}
          </span>
        )}
      </div>
    }
  >
    <div>
      <h3 className="text-timberWolf text-[20px] font-bold font-poppins">
        {experience.title}
      </h3>
      <p
        className="text-taupe text-[16px] font-medium font-poppins"
        style={{ margin: '4px 0 0' }}>
        {experience.company_name}
      </p>
    </div>
  </VerticalTimelineElement>
);

const Experience = () => {
  const { lang } = useLang();
  const tr = pt[lang].experience;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubTextLight} sm:pl-16 pl-[2rem]`}>
          {tr.sub}
        </p>
        <h2 className={`${styles.sectionHeadTextLight} sm:pl-16 pl-[2rem]`}>
          {tr.title}
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
          <VerticalTimelineElement
            contentStyle={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(124,58,237,0.2)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            contentArrowStyle={{ borderRight: '7px solid rgba(124,58,237,0.4)' }}
            iconStyle={{ background: '#151030', boxShadow: '0 0 0 4px rgba(124,58,237,0.3)' }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <img src={resume} alt="" className="w-[45%] h-[45%] object-contain" />
              </div>
            }
          >
            <a
              href="https://github.com/felipechaux/curriculum/blob/master/CVFelipeChaux.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 px-6 font-poppins text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
              </svg>
              {tr.resume}
            </a>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
