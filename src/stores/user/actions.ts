import { createAction } from '@reduxjs/toolkit';
import { QueryParams } from '@services/types';

import { UserActionTypes } from './types';

export const searchUser = createAction<QueryParams>(UserActionTypes.SEARCH);
