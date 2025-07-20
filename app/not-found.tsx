import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Page Not Found',
  description: '404 page — something went wrong',
  icons:'/not-found.webp',
  openGraph:{
    title:'404 Page Not Found',
    description:'404 page — something went wrong',
    url:'https://08-zustand-black.vercel.app/not-found',
    images:[{
      url:'https://img.freepik.com/free-vector/white-cross-mark-paint-style-red-background_78370-2969.jpg',
      width:1200,
      height:630,
      alt:'404'
    }]
  }
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}


