import React, {CSSProperties, ReactElement} from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded';
import WorkOffRoundedIcon from '@mui/icons-material/WorkOffRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import {AddOutlined} from "@mui/icons-material";
import {alpha, SxProps} from "@mui/material";
import {DRAFT_ROUTES, ROOT_ROUTES} from "@/const/route";

export type menuItem = {
  text: string,
  path?: string,
  icon?: ReactElement,
  styleOptions?: /*CSSProperties*/ SxProps,
  subList?: menuItem[]
}

export const menuList: menuItem[] = [
  {
    text: '기안 작성하기',
    icon: <AddOutlined sx={{color: 'white'}}/>,
    styleOptions: {
      minHeight: 64,
      backgroundColor: '#00796B',
      color: 'white',
      '&.Mui-selected': {
        backgroundColor: '#00796B',
        color: 'white'
      },
    }
  },
  {
    text: '기안함',
    icon: <BorderColorIcon/>,
    subList: [
      {text: '임시저장 문서', path: DRAFT_ROUTES.TEMPORARY},
      {text: '진행중 문서', path: DRAFT_ROUTES.PROGRESS},
      {text: '반송 문서', path: DRAFT_ROUTES.RETURN},
      {text: '개인완료 문서', path: DRAFT_ROUTES.DONE},
    ]
  },
  {text: '결재함', path: ROOT_ROUTES.TEST1, icon: <AssignmentTurnedInIcon/>},
  {text: '부서 결재함', path: ROOT_ROUTES.TEST1, icon: <GroupsIcon/>},
  {text: '회람함', path: ROOT_ROUTES.TEST1, icon: <FactCheckIcon/>},
  {text: '수신함', path: ROOT_ROUTES.TEST1, icon: <MoveToInboxIcon/>},
  {text: '중요 문서함', path: ROOT_ROUTES.TEST1, icon: <StarRoundedIcon/>},
  {text: '개인 보관함', path: ROOT_ROUTES.TEST1, icon: <LabelRoundedIcon/>},
]


export const settingList: menuItem[] = [
  {text: '개인 결재선 관리', path: ROOT_ROUTES.TEST2, icon: <RecentActorsRoundedIcon/>},
  {text: '부재 관리', path: ROOT_ROUTES.TEST2, icon: <WorkOffRoundedIcon/>},
  {text: '결재 관리자', path: ROOT_ROUTES.TEST1, icon: <SettingsIcon/>},
]

