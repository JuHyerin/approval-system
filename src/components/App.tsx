import React, {useState} from "react";
import {OptionAppBar} from "@components/common/appbar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "@/customedMui/theme";
import {BrowserRouter, Routes, Route, Outlet, useRoutes, RouteObject} from "react-router-dom";
import {Page1, Page2, Draft} from "@components/pages";
import {PageLayout} from "@components/common/layout/PageLayout";
import {DRAFT_ROUTES, ROOT_ROUTES} from "@/const/route";
import {Done} from "@components/pages/draft/Done";
import {Temporary} from "@components/pages/draft/Temporary";
import {Progress} from "@components/pages/draft/Progress";
import {Return} from "@components/pages/draft/Return";


export const routes: RouteObject[] = [
  {
    path: ROOT_ROUTES.ROOT,
    element: <PageLayout/>,
    children: [
      {index: true, element: <Page1/>},
      {path: ROOT_ROUTES.TEST1, element: <Page1/>},
      {path: ROOT_ROUTES.TEST2, element: <Page2/>},
      {
        path: DRAFT_ROUTES.ROOT,
        element: <Draft/>,
        children: [
          {path: DRAFT_ROUTES.TEMPORARY, element: <Temporary/>},
          {path: DRAFT_ROUTES.PROGRESS, element: <Progress/>},
          {path: DRAFT_ROUTES.RETURN, element: <Return/>},
          {path: DRAFT_ROUTES.DONE, element: <Done/>},
        ]
      }
    ]

  }
]

const App = () => {
  let element = useRoutes(routes)
  return (
    // <ThemeProvider theme={theme}>
    //   <Box sx={{display: 'flex'}}>
    //     {/*<CssBaseline />*/}
    //     <OptionAppBar
    //       title={'MUI TEST'}
    //       menu
    //       onMenuClick={onMenuClick}
    //       searchBar
    //     />
    //     <MiniNav open={open} menuList={menuList} settingList={settingList}/>
    //     <PageLayout>
    //       {/*<BrowserRouter>*/}
    //         <Routes>
    //           <Route path={ROOT_ROUTES.ROOT} element={<Page1/>} />
    //           <Route path={ROOT_ROUTES.TEST1} element={<Page1/>} />
    //           <Route path={ROOT_ROUTES.TEST2} element={<Page2/>} />
    //           <Route path={ROOT_ROUTES.DRAFT} element={<Draft/>} >
    //             <Route path={DRAFT_ROUTES.DONE} element={<Done/>} />
    //           </Route>
    //         </Routes>
    //       {/*</BrowserRouter>*/}
    //     </PageLayout>
    //   </Box>
    // </ThemeProvider>
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  )

}

export default App
