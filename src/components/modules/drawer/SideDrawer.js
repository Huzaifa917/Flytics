import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import styles from "./DrawerStyles";
import logo from "./../../../resources/design-images/drawer-logo.svg";
//import { DashboardIcon } from "./../../../resources/design-icons/drawer-icons";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import {
  LocationIcon,
  ReportIcon,
  SettingsIcon,
  StaffIcon,
} from "../../../resources/design-icons/drawer-icons";
import { KeyboardArrowDown } from "@mui/icons-material";
import DrawerNav from "../drawer-nav/DrawerNav";
import { Outlet } from "react-router-dom";

function SideDrawer(props) {
  const { classes } = props;
  const selected = "dashboard";
  const isSelected = (str) => {
    return str === selected;
  };
  return (
    <div className={classes.root}>
      <Drawer variant="persistent" className={classes.drawer} open>
        <div className={classes.logoContainer}>
          <img
            src={logo}
            alt="people-metrics-logo"
            className={classes.logoImage}
          />
        </div>
        <List>
          <Divider />
          <ListItemButton
            className={
              isSelected("dashboard")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <DashboardIcon
                className={isSelected("dashboard") ? classes.selectedIcon : ""}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <Divider />
          <ListItemButton
            className={
              isSelected("staff")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <StaffIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
            <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon>
          </ListItemButton>

          <Divider />
          <ListItemButton
            className={
              isSelected("locations")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText primary="Locations" />
            <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon>
          </ListItemButton>

          <Divider />
          <ListItemButton
            className={
              isSelected("report")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
            <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon>
          </ListItemButton>

          <Divider />
          <ListItemButton
            className={
              isSelected("settings")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>
      <DrawerNav />
      <Outlet />
    </div>
  );
}

export default withStyles(styles)(SideDrawer);
