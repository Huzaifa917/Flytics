import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import styles from "./NavStyles";
import {
  AltIcon,
  MessageBoxIcon,
  SettingAdjustIcon,
  BellIcon,
  SupportIcon,
} from "./../../../resources/design-icons/drawer-navbar-icons";
import SearchIcon from "@mui/icons-material/Search";
import { NavSelect } from "../../helpers/nav-select";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useNavigate } from "react-router-dom";

function DrawerNav(props) {
  const { classes } = props;
  const [department, setDepartment] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleProfileClick = (e) => setMenuAnchor(e.currentTarget);
  const navigate = useNavigate();
  const logUserOut = () => {
    navigate("/")
  };
  return (
    <>
      <div className={classes.nav}>
        <AppBar className={classes.appBar} elevation={0}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.welcomeDiv}>
              <AltIcon />
              <Typography className={classes.welcomeText}>
                Welcome to People Metrics
              </Typography>
            </div>
            <div className={classes.navWidgets}>
              {/* <Select
                IconComponent={() => <KeyboardArrowDown />}
                className={classes.select}
              >
                <option>Sales Department</option>
              </Select> */}
              <NavSelect
                value={department}
                placeholder={"Sales Department"}
                options={
                  [
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "accountsDepartment", text: "accounts Department" },
                    // {
                    //   value: "operationsDepartment",
                    //   text: "operations Department",
                    // },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                    // { value: "salesDepartment", text: "Sales Department" },
                  ]
                }
                handleOptionChange={(e) => {
                  setDepartment(e.target.value);
                }}
              />
              <Divider flexItem orientation="vertical" />
              <InputBase
                placeholder="Search here..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                startAdornment={
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment>
                    <SettingAdjustIcon />
                  </InputAdornment>
                }
              />
              <Divider orientation="vertical" flexItem />
              <div className={classes.iconWidgetsContainer}>
                <div className={classes.widgetIconBUtton}>
                  <MessageBoxIcon />
                </div>
                <div className={classes.widgetIconBUtton}>
                  {/* <BellIcon /> */}
                  <NotificationsNoneRoundedIcon />
                </div>
                <div className={classes.widgetIconBUtton}>
                  <SupportIcon />
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div
                className={classes.navProfileWidget}
                onClick={handleProfileClick}
              >
                <div className={classes.userInfoContainer}>
                  <Avatar src="sd" alt="Ahmed" className={classes.avatar} />
                  <div className={classes.userInfoText}>
                    <Typography className={classes.username}>Ahmed</Typography>
                    <Typography className={classes.userRole}>Admin</Typography>
                  </div>
                </div>
                {Boolean(menuAnchor) ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Menu
        anchorEl={menuAnchor}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <List>
          <MenuItem disabled>
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={logUserOut}>
            <ListItemIcon>
              <PowerSettingsNewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </List>
      </Menu>
    </>
  );
}

export default withStyles(styles)(DrawerNav);
