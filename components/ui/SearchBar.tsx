'use client'

import type { FormEventHandler, InputHTMLAttributes, ReactNode } from 'react'

interface SearchBarProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  submitLabel: string
  /** Un ou plusieurs <SearchField />. */
  children: ReactNode
  className?: string
  'aria-label'?: string
}

/** Barre de recherche arrondie, ombre nette, champs + bouton lime. */
export default function SearchBar({ onSubmit, submitLabel, children, className = '', ...rest }: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label={rest['aria-label']}
      className={`flex flex-col gap-2 rounded-[28px] border-[1.6px] border-ink bg-white p-2 shadow-hard sm:flex-row sm:items-stretch ${className}`}
    >
      <div className="flex flex-1 flex-col divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0">{children}</div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full border-[1.6px] border-ink bg-lime px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-electric hover:text-white"
      >
        {submitLabel}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  )
}

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  children?: ReactNode
}

/** Champ avec legende mono et vrai <label>. `children` = liste de suggestions. */
export function SearchField({ id, label, children, className = '', ...input }: SearchFieldProps) {
  return (
    <div className="relative flex-1 px-5 py-2">
      <label htmlFor={id} className="eyebrow block text-slate">
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-transparent py-1 text-base font-medium text-ink placeholder:text-slate/70 outline-none ${className}`}
        {...input}
      />
      {children}
    </div>
  )
}
