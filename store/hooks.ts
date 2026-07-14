import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// • Custom hooks for type-safe Redux usage
// • Auto-knows state structure, no manual typing needed

// • Hook to dispatch actions for state updates
export const useAppDispatch = () => useDispatch<AppDispatch>();

// • Hook to read data from state
// • Type-safe: warns if accessing non-existent state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
