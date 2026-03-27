import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { download, downloadHover, resume } from '../assets';
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
      <h3 className="text-taupe text-[16px] font-bold font-beckman">
        {experience.date}
      </h3>
    }
    iconStyle={{
      background: experience.iconBg,
      boxShadow: '0 0 0 4px rgba(124,58,237,0.3), inset 0 2px 0 rgba(0,0,0,0.08)',
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img src={experience.icon} alt={experience.company_name} className="w-[60%] h-[60%] object-contain" />
      </div>
    }
  >
    <div>
      <h3 className="text-timberWolf text-[22px] font-bold font-beckman tracking-[2px]">
        {experience.title}
      </h3>
      <p
        className="text-taupe text-[18px] font-semibold font-overcameBold tracking-[1px]"
        style={{ margin: 0 }}>
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
            iconStyle={{ background: '#333333', boxShadow: '0 0 0 4px rgba(124,58,237,0.3)' }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <img src={resume} alt="resume" className="w-[45%] h-[45%] object-contain" />
              </div>
            }
          >
            <button
              className="live-demo flex justify-between
              sm:text-[18px] text-[14px] text-timberWolf
              font-bold font-beckman items-center py-5 pl-3 pr-3
              whitespace-nowrap gap-1 sm:w-[148px] sm:h-[58px]
              w-[125px] h-[46px] rounded-[10px]
              hover:bg-purple-700 hover:text-white
              transition duration-[0.2s] ease-in-out"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                color: '#fff',
              }}
              onClick={() => window.open('https://github.com/felipechaux/curriculum/blob/master/CVFelipeChaux.pdf', '_blank')}
              onMouseOver={() => document.querySelector('.download-btn').setAttribute('src', downloadHover)}
              onMouseOut={() => document.querySelector('.download-btn').setAttribute('src', download)}
            >
              MY RESUME
              <img src={download} alt="download" className="download-btn sm:w-[26px] sm:h-[26px] w-[23px] h-[23px] object-contain" />
            </button>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
