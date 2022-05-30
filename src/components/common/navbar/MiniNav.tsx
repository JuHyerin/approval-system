import React, {useState} from "react";
import {
  Divider,
  Drawer,
  styled,
  Toolbar
} from "@mui/material";
import {closedMixin, openedMixin} from "@components/common/navbar/common/DrawerMixin";
import {menuList, settingList} from "@/const/menu";
import {NavList} from "@components/common/navbar/common";

const drawerWidth = 240
const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...closedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': closedMixin(theme, drawerWidth),
    }),
  }),
);

interface IMiniNav {
  open: boolean
}

export const MiniNav = (props: IMiniNav) => {
  const {open} = props

  // menu | setting
  const [isSettingSelected, setIsSettingSelected] = useState<boolean>(false)

  const onMenuNavListClick = () => {
    setIsSettingSelected(false)
  }

  const onSettingNavListClick = () => {
    setIsSettingSelected(true)
  }

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar/>
      <NavList open={open} list={menuList} onClick={onMenuNavListClick} selected={!isSettingSelected} />
      <Divider/>
      <NavList open={open} list={settingList} onClick={onSettingNavListClick} selected={isSettingSelected}/>
    </StyledDrawer>
  )
}
