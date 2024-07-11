export type BookReference = {
  referenceId: string;
  referneceType: 'book';
  title: string;
  isbn: string;
}

export type ThesisReference = {
  referenceId: string;
  referenceType: 'thesis';
  title: string;
}

export type CodeReference = {
  referenceId: string;
  referenceType: 'code';
  title: string
}

export type Reference = BookReference | ThesisReference | CodeReference;
