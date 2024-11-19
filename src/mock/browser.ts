import { setupWorker } from 'msw/browser';
import { reviewById } from './review';

const handlers = [reviewById];

export const worker = setupWorker(...handlers);
