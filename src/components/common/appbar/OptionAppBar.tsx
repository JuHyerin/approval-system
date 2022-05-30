import React, {useState} from "react";
import {alpha, AppBar, AppBarProps, IconButton, styled, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {SearchInput} from "@components/common/form";



const StyledAppBar = styled(AppBar)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'fixed',
}))

const StyledIconButton = styled(IconButton)(({theme}) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  color: 'inherit',
}))

interface IOptionAppBar extends AppBarProps{
  title: string
  menu?: boolean
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>
  searchBar?: boolean
}

export const OptionAppBar = (props: IOptionAppBar) => {
  const {title, searchBar, menu, onMenuClick} = props

  return (
    <StyledAppBar >
      <Toolbar>
        {menu &&
          <StyledIconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </StyledIconButton>
        }
        <Typography>{title}</Typography>
        {searchBar && <SearchInput/>}
      </Toolbar>
    </StyledAppBar>
  )
}
