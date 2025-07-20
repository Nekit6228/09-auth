import { fetchNoteById } from '@/lib/api/clientApi';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: 'Note not found',
      description: 'This note does not exist.',
    };
  }

  return {
    title: note.title,
    description: note.content.slice(0, 100),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 100),
      url: `https://08-zustand-psi.vercel.app/notes/${note.id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub App',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.content.slice(0, 100),
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p><strong>Tag:</strong> {note.tag}</p>
      <p>{note.content}</p>
      <p><small>Created: {new Date(note.createdAt).toLocaleString()}</small></p>
      <p><small>Updated: {new Date(note.updatedAt).toLocaleString()}</small></p>
    </div>
  );
}
