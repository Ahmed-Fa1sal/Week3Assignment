import { createAction, props } from '@ngrx/store';

// Define actions for uploading documents
export const uploadDocument = createAction(
  '[Document] Upload Document',
  props<{ document: any }>()
);

export const uploadDocumentSuccess = createAction(
  '[Document] Upload Document Success',
  props<{ response: any }>()
);

export const uploadDocumentFailure = createAction(
  '[Document] Upload Document Failure',
  props<{ error: any }>()
);
