import React from 'react';
import { JournalEntry } from './JournalEntry';

export interface JournalEntryLine {
  account: string;
  debit?: number;
  credit?: number;
  isDebit: boolean;
}

export interface JournalEntryTableProps {
  date: string;
  description?: string;
  lines: JournalEntryLine[];
}

export function JournalEntryTable({ date, description, lines }: JournalEntryTableProps) {
  return (
    <JournalEntry 
      date={date}
      description={description}
      entries={lines}
    />
  );
}
