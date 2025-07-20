import { getServerMe } from '@/lib/api/serverApi';
import css from './Prodile.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const { username } = await getServerMe();

  return {
    title: username,
    description: `Profile:${username}`,
    openGraph: {
      title: username,
      description: `Profile:${username}`,
      url: `https://09-auth-umber.vercel.app/profile`,
      siteName: "NoteHub",
      images: [
        {
          url:"/notehub-og-meta.webp",
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: username,
      description: `Profile:${username}`,
      images: ["/notehub-og-meta.webp"],
    },
  };
};
const Profile  = async () =>{
  const user = await getServerMe();
  
    return(
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	      <Link href="/profile/edit" className={css.editProfileButton} >Edit profile</Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
         src={user.avatar || "/notehub-og-meta.webp"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user?.username || "Guest"}
      </p>
      <p>
        Email: {user?.email || "your_email"}
      </p>
    </div>
  </div>
</main>

    )
}

export default Profile ;