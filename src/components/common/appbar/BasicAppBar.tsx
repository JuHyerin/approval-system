import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";

interface IBasicAppBar {
  title: string
}

export const BasicAppBar = (props: IBasicAppBar) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography>{props.title}</Typography>
      </Toolbar>
    </AppBar>
  )
}
