import Image from 'next/image';
import styles from './layout.module.scss';
import Link from 'next/link';
import DogImage from '@public/dog.jpg';
import Header from './components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <Link href="/" className={styles.menuItem}>
          🏠 Home
        </Link>
        <Link href="/dog" className={styles.menuItem}>
          🐕 Dog
        </Link>
        <Link href="/dogrun" className={styles.menuItem}>
          🏕️ Dogrun
        </Link>
        <Link href="" className={styles.menuItem}>
          ⚙️ Settings
        </Link>
      </nav>
      <div className={styles.main}>
        <Header />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
}
