import React from "react";
import {RouteObject} from "react-router-dom";
import {Draft, Page1} from "@components/pages";
import {PageLayout} from "@components/common/layout";
import {Done} from "@components/pages/draft/Done";


export const ROOT_ROUTES = {
  ROOT: '/',
  DRAFT: '/draft',
  TEST1: '/page1',
  TEST2: '/page2'
}
export const DRAFT_ROUTES =  {
  ROOT: `${ROOT_ROUTES.DRAFT}`,
  TEMPORARY: `${ROOT_ROUTES.DRAFT}/temporary-storage`,
  PROGRESS: `${ROOT_ROUTES.DRAFT}/in-progress`,
  RETURN: `${ROOT_ROUTES.DRAFT}/return`,
  DONE: `${ROOT_ROUTES.DRAFT}/done`,
}
