import { fetchNotes } from '@/lib/api/clientApi';
import NotesClient from './Notes.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Note, Tag } from '@/types/note';
import type { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}


export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug.length > 0 && slug[0] !== 'All' ? (slug[0] as Tag) : 'All';

  return {
    title: `Notes - ${tag}`,
    description: `Viewing notes tagged with "${tag}"`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `All notes related to ${tag}`,
      url: `https://08-zustand-black.vercel.app/notes/filter/${tag}`,
      siteName: 'Notes',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes tagged ${tag}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Notes - ${tag}`,
      description: `All notes related to ${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tagFromSlug = slug.length > 0 ? slug[0] : 'All';
  const tag = tagFromSlug === 'All' ? undefined : (tagFromSlug as Tag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes('', 1, tag),
  });

  const initialData = queryClient.getQueryData<FetchNotesResponse>(['notes', '', 1, tag])!;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} initialTag={tagFromSlug} />
    </HydrationBoundary>
  );
}


