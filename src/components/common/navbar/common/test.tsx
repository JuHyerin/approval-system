import React, {useEffect, useRef, useState} from "react";
import {menuItem} from "@/const/menu";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon as MuiListItemIcon, ListItemIconProps,
  ListItemProps,
  ListItemText, styled ,Typography, useTheme
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


interface ICustomDefault {
  open?: boolean
  selected?: boolean
}

interface IMainListItemButton extends ListItemProps, ICustomDefault{}
const MainListItemButton = styled(ListItemButton,{
  shouldForwardProp: (propName: string) => !['open'].includes(propName)
})<IMainListItemButton>(({open, theme}) => ({
  minHeight: 48,
  boxSizing: 'inherit',
  px: 2.5,
}))

interface IListItemIcon extends ListItemIconProps, ICustomDefault {}
const ListItemIcon = styled(MuiListItemIcon,{
  shouldForwardProp: (propName: string) => !['open'].includes(propName)
})<IListItemIcon>(({open, theme}) => ({
  minWidth: 0,
  mr: open ? 3 : "auto",
  justifyContent: "center",
}))

const SubListItemButton = styled(ListItemButton)(({theme}) => ({
  pl: 4,
}))

interface IMainListItemTypo extends ListItemProps, ICustomDefault  {}
const MainListItemTypo = styled(Typography,{
  shouldForwardProp: (propName: string) => !['open', 'selected'].includes(propName)
})<IMainListItemTypo>(({open, selected, theme}) => ({
  fontSize: 16,
  opacity: open ? 1 : 0,
  color: selected
    ? theme.palette.primary.main
    : ''
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
  // const [selectedSubIndex, setSelectedSubIndex] = useState<number>(-1)

  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    // !selected && setSelectedSubIndex(-1)
    // 다른 (메인)메뉴 클릭되면 서브 메뉴 닫기
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
    // setSelectedSubIndex(index)
    subItem.path && navigate(subItem.path)
  }

  return (
    <ListItem disablePadding sx={{display: 'block'}}>
      <MainListItemButton
        onClick={onItemClick}
        sx={{
          justifyContent: open ? "initial" : "center",
          ...attrs.styleOptions
        }}
        selected={selected}>
        <ListItemIcon>
          {attrs.icon}
        </ListItemIcon>
        <ListItemText
          // primary={<MainListItemTypo open={open} selected={selected}>{text}</MainListItemTypo>}
          primary={text}
          sx={{
            opacity: open ? 1 : 0,
            color: selected
              ? theme.palette.primary.main
              : ''
          }}
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
                    // selected={selectedSubIndex === subIndex}
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
