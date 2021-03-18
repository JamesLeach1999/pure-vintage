import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
} from "@material-ui/core";
// import NotificationsNoneIcon from "@material-ui/core/NotificationsNoneIcon";
// import ChatBubbleOutlineIcon from "@material-ui/core/ChatBubbleOutlineIcon";
// import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNewIcon";
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item sm={6}>
            <InputBase />
          </Grid>
          <Grid sm item>

          </Grid>
          <Grid item sm={6} style={{ border: "1px solid #000" }}>
            {/* <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <PowerSettingsNewIcon />
              </Badge>
            </IconButton> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
