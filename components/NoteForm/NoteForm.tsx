'use client';

import { useId } from 'react';
import css from './NoteForm.module.css';
import type { NewNote, Tag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

const NoteForm = () => {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const onClose = () => router.push('/notes/filter/All');

  const mutation = useMutation({
    mutationFn: (values: NewNote) => createNote(values),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const values: NewNote = {
      title: (formData.get('title') as string) || '',
      content: (formData.get('content') as string) || '',
      tag: (formData.get('tag') as Tag) || 'Todo',
    };

    mutation.mutate(values);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({
      ...draft,
      [name]: value,
    });
  };

  const isFormValid =
    draft.title.trim().length >= 3 && draft.title.trim().length <= 50;

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor={`${fieldId}-title`}>
          Title
        </label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft.title}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor={`${fieldId}-content`}>
          Content
        </label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft.content}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor={`${fieldId}-tag`}>
          Tag
        </label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div>
  <button
    onClick={onClose}
    type="button"
    className={css.cancelButton}
    disabled={mutation.status === 'pending'}
  >
    Cancel
  </button>
  <button
    type="submit"
    className={css.submitButton}
    disabled={!isFormValid || mutation.status === 'pending'}
  >
    Create note
  </button>
</div>

    </form>
  );
};

export default NoteForm;
