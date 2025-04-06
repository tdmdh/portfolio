import Marquee from 'react-fast-marquee';
import styles from '@/styles/Marquee.module.css';
import Image from 'next/image';

const MarqueeDemo = () => {
    return (
        <div className={styles.marqueeContainer} >
            <div className={styles.marquee} >
                <Marquee gradient={false} speed={40} >
                    <Image className={styles.icon} src="/icons/nextjs-icon.svg" alt="Description" width={150} height={150} />
                    <Image className={styles.icon} src="/icons/css-icon.svg" alt="Description" width={150} height={150} />
                    <Image className={styles.icon} src="/icons/figma-icon.svg" alt="Description" width={150} height={150} />
                    <Image className={styles.icon} src="/icons/html-icon.svg" alt="Description" width={150} height={150} />
                    <Image className={styles.icon} src="/icons/React-icon.png" alt="Description" width={150} height={150} />
                    <Image className={styles.icon} src="/icons/three-js-icon.png" alt="Description" width={150} height={150} />
                    <Image className={styles.icon} src="/icons/javascript-icon.svg" alt="Description" width={150} height={150}  />
                </Marquee>
            </div>
        </div>  
    );
} 

export default MarqueeDemo;
