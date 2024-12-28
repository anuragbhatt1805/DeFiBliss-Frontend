import { signal } from "@preact/signals-react";
import { ReclaimSignature } from "./interface";

export const accountToken = signal<string | null>(null);
export const proofs = signal<ReclaimSignature | null>(null);