"use client";

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { UserData } from '@/types/Auth';
import { editUser } from '@/lib/api/clientApi';
import Image from 'next/image';
import css from './page.module.css';


const EditProfile  = () =>{
const [error,setError] = useState("");
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

   const handleSubmit = async (formData: FormData) =>{
     const username = String(formData.get("username")).trim();

     if (user) {
      const updatedUser: UserData = {
        username,
        email: user.email,
      };
      try {
        const response = await editUser(updatedUser);
        setUser(response);
        router.push("/profile");
      } catch (err) {
        console.error("Error", err);
        setError("Failed");
      }
    }
   }


  
    return(
        <>
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image 
    src="/public/notehub-og-meta.webp"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} action={handleSubmit}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input 
        id="username"
              type="text"
               name="username" 
          className={css.input}
           defaultValue={user?.username}
        />
      </div>

      <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={() => router.push("/profile")}>
          Cancel
        </button>
        {error && <p className={css.error}>{error}</p>}
      </div>
    </form>
  </div>
</main>

        </>
    )
}

export default EditProfile;