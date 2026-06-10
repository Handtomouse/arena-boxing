import type { TrainerData } from '@/components/sections/TrainersModule';

/**
 * Trainer roster.
 *
 * Bios, certifications, and Instagram handles are intentionally left as
 * bracketed PENDING placeholders. These come from the coaches themselves
 * and must not be invented.
 */
export const trainers: TrainerData[] = [
  {
    id: 'brendan-mcdonnell',
    name: 'Brendan McDonnell',
    title: 'Head Coach',
    image: '/images/trainers/brendan-mcdonnell.jpg',
    bio: '[BIO PENDING, Brendan to supply]',
    specialties: [],
    certifications: ['[CREDENTIALS PENDING]'],
    instagram: '[HANDLE PENDING]',
  },
  {
    id: 'henry-payten',
    name: 'Henry Payten',
    title: 'Coach',
    image: '/images/trainers/henry-payten.jpg',
    bio: '[BIO PENDING]',
    specialties: [],
    certifications: ['[CREDENTIALS PENDING]'],
    instagram: '[HANDLE PENDING]',
  },
  {
    id: 'matt-bull',
    name: 'Matt Bull',
    title: 'Coach',
    image: '/images/trainers/matt-bull.jpg',
    bio: '[BIO PENDING]',
    specialties: [],
    certifications: ['[CREDENTIALS PENDING]'],
    instagram: '[HANDLE PENDING]',
  },
  {
    id: 'zach-levy',
    name: 'Zach Levy',
    title: 'Coach',
    image: '/images/trainers/zach-levy.jpg',
    bio: '[BIO PENDING]',
    specialties: [],
    certifications: ['[CREDENTIALS PENDING]'],
    instagram: '[HANDLE PENDING]',
  },
];

export default trainers;
