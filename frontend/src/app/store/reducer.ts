import { createReducer, on } from '@ngrx/store';
import { uploadDocument, uploadDocumentSuccess, uploadDocumentFailure } from './actions';

// Define the state structure
export interface DocumentState {
  document: any | null;
  loading: boolean;
  error: any | null;
}

// Initial state
export const initialState: DocumentState = {
  document: null,
  loading: false,
  error: null,
};

// Create the reducer that updates the state based on the actions
export const documentReducer = createReducer(
  initialState,
  on(uploadDocument, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(uploadDocumentSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    document: response,
  })),
  on(uploadDocumentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
