import { SetMetadata } from '@nestjs/common';

export const REGEX = /\(([^)]+)\)/;
export const JWT_SECRET = 'CUeP4-Pru3b4'; // Firma de JWT

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
