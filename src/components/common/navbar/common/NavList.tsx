import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {menuItem} from "@/const/menu";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListProps} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {NavItem} from "@components/common/navbar/common/NavItem";

interface INavList extends ListProps{
  open: boolean
  list: menuItem[]
  selected: boolean // menu | setting
}
export const NavList = (props: INavList) => {
  // 메뉴바 open
  const {open, list, selected} = props

  // 메인 메뉴 중 하나만 selected 되도록 flag
  const [selectedIndex, setSelectedIndex] = useState<number>()

  const onItemClick = (index: number, e: any) => {
    e.preventDefault()
    props.onClick && props.onClick(e)
    setSelectedIndex(index)
  }

  return (
    <List sx={{p: 0}}>
      {list.map((item, index) => (
        <NavItem
          key={index}
          item={item}
          open={open}
          onClick={e => onItemClick(index, e)}
          selected={selected && selectedIndex === index}
        />
      ))}
    </List>
  )
}
