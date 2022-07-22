import { createAction } from '@reduxjs/toolkit';
import { QueryParams } from '@services/types';

import { UserActionTypes, Library } from './types';

export const searchUser = createAction<QueryParams>(UserActionTypes.SEARCH);

export const updateLibrary = createAction<Library[]>(
  UserActionTypes.UPDATE_LIBARY
);
