import { getServerMe } from '@/lib/api/serverApi';
import css from './Prodile.module.css';
import Link from 'next/link';
import Image from 'next/image';


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
        src="/notehub-og-meta.webp"
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