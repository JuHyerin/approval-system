import React, {ReactElement, useState} from "react";
import {Box, styled, Toolbar} from "@mui/material";
import {OptionAppBar} from "@components/common/appbar";
import {MiniNav} from "@components/common/navbar";
import {Outlet} from "react-router-dom";

interface IPageWrapper {
  children?: ReactElement
}

const StyledBox = styled(Box)(({theme}) => ({
  backgroundColor: '#E5E5E5',
  height: '100vh',
}))
export const PageLayout = (props: IPageWrapper) => {
  const [open, setOpen] = useState<boolean>(false)
  const onMenuClick = () => setOpen(prevState => !prevState)
  return (
    <Box sx={{display: 'flex'}}>
      <OptionAppBar
        title={'MUI TEST'}
        menu
        onMenuClick={onMenuClick}
        searchBar
      />
      <MiniNav open={open}/>
      <StyledBox component={'main'} sx={{flexGrow:1, p:3}}>
        <Toolbar/>
        <Outlet />
      </StyledBox>
    </Box>
  )
}
