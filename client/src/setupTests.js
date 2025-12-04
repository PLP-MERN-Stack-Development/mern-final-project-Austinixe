// Setup file for Vitest + React Testing Library
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock CSS/SCSS imports so tests don't break
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('*.module.css', () => ({}));
vi.mock('*.module.scss', () => ({}));

// Mock image imports
vi.mock('*.png', () => 'mocked-image.png');
vi.mock('*.jpg', () => 'mocked-image.jpg');
vi.mock('*.jpeg', () => 'mocked-image.jpeg');
vi.mock('*.svg', () => 'mocked-image.svg');
