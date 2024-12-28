import { signal } from "@preact/signals-react";

export const accountToken = signal<string | null>(null);
export const proofs = signal<string | null>(null);