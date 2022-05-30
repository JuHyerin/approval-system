import React, {useEffect, useRef, useState} from "react";
import {menuItem} from "@/const/menu";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton, ListItemIcon as MuiListItemIcon,
  ListItemIconProps,
  ListItemProps,
  ListItemText,
  styled, Typography
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

interface ICustomDefault {
  open?: boolean
  selected?: boolean
}

interface IListItemIcon extends ListItemIconProps, ICustomDefault {}
const ListItemIcon = styled(MuiListItemIcon,{
  shouldForwardProp: (propName: string) => !['open', 'selected'].includes(propName)
})<IListItemIcon>(({open, selected, theme}) => ({
  minWidth: 0,
  marginRight: open ? theme.spacing(3) : "auto",
  justifyContent: "center",
  ...(selected && {color: 'inherit'}),
}))

interface IMainListItemButton extends ListItemIconProps, ICustomDefault {}
const MainListItemButton = styled(ListItemButton,{
  shouldForwardProp: (propName: string) => !['open'].includes(propName)
})<IMainListItemButton>(({open, theme}) => ({
  minHeight: 48,
  boxSizing: 'inherit',
  justifyContent: open ? "initial" : "center",
  paddingRight: theme.spacing(2.5),
  paddingLeft: theme.spacing(2.5),
}))

const SubListItemButton = styled(ListItemButton)(({theme}) => ({
  pl: 4,
}))

interface IMainListItemTypo extends ListItemProps, ICustomDefault  {}
const MainListItemTypo = styled(Typography,{
  shouldForwardProp: (propName: string) => !['open'].includes(propName)
})<IMainListItemTypo>(({open, theme}) => ({
  fontSize: 16,
  opacity: open ? 1 : 0,
  color: 'inherit'
}))

interface ISubListItemTypo extends ListItemProps, ICustomDefault{}
const SubListItemTypo = styled(Typography,{
  shouldForwardProp: (propName: string) => !['selected' ].includes(propName)
})<ISubListItemTypo>(({selected, theme}) => ({
  fontSize: 14,
  color: selected
    ? theme.palette.primary.main
    : ''
}))

interface INavItem extends ListItemProps{
  open: boolean
  item: menuItem
  selected: boolean // main menu selected
}

export const NavItem = (props: INavItem) => {
  const {open, item: {text, ...attrs}, selected} = props

  // 서브 메뉴 open
  const [subListOpen, setSubListOpen] = useState<boolean>(false)

  // 서브 메뉴 중 하나만 selected 되도록 flag
  const selectedSubIndex = useRef<number>()

  const navigate = useNavigate()


  useEffect(() => {
    // 다른 (메인)메뉴 클릭되면 서브 메뉴 닫고 서브 메뉴 selected 초기화
    if(!selected) {
      setSubListOpen(false)
      selectedSubIndex.current = -1
    }
  },[selected])

  const onItemClick = (e: any) => {
    e.preventDefault()
    props.onClick && props.onClick(e)
    attrs.path
      ? navigate(attrs.path)
      : setSubListOpen(prevState => !prevState)

  }
  const onSubItemClick = (subItem:menuItem, index: number, e: any) => {
    e.preventDefault()
    selectedSubIndex.current = index
    subItem.path && navigate(subItem.path)
  }

  return (
    <ListItem disablePadding sx={{display: 'block'}}>
      <MainListItemButton
        open={open}
        selected={selected}
        onClick={onItemClick}
        sx={{...attrs.styleOptions}}
      >
        <ListItemIcon open={open} selected={selected}>
          {attrs.icon}
        </ListItemIcon>
        <ListItemText
          primary={<MainListItemTypo open={open} selected={selected}>{text}</MainListItemTypo>}
        />
        {open && attrs.subList && (subListOpen ? <ExpandLess/> : <ExpandMore/>)}
      </MainListItemButton>
      {attrs.subList &&
          <Collapse in={open && subListOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {attrs.subList.map((subItem, subIndex) => (
                  <SubListItemButton
                    key={subIndex}
                    onClick={(e) => onSubItemClick(subItem, subIndex, e)}
                    selected={selected && selectedSubIndex.current === subIndex}
                  >
                    <ListItemText
                      secondary={<SubListItemTypo selected={selectedSubIndex.current === subIndex}>{subItem.text}</SubListItemTypo>}
                    />
                  </SubListItemButton>
                ))}
              </List>
          </Collapse>
      }
    </ListItem>
  )
}
