import { motion } from 'framer-motion';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import { useLang } from '../context/LanguageContext';
import { pt } from '../constants/portfolioTranslations';

const Tech = () => {
  const { lang } = useLang();
  const tr = pt[lang].tech;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>{tr.sub}</p>
        <h2 className={styles.sectionHeadTextLight}>{tr.title}</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) => (
          <figure className="flex flex-col items-center gap-2" key={technology.name}>
            <div className="w-28 h-28">
              <BallCanvas icon={technology.icon} />
            </div>
            <figcaption className="font-poppins text-[13px] font-medium text-taupe">
              {technology.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, '');
