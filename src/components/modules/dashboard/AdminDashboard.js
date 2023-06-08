import {
  Backdrop,
  CircularProgress,
  Divider,
  List,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
// import { DashboardIcon } from "../../../resources/design-icons/drawer-icons";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import styles from "./AdminDashboardStyles";
import DateSelector from "../../helpers/date-selector/DateSelector";
import { format } from "date-fns";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DashboardTopCard } from "../../helpers/dashboard-top-card";
// import { AttendanceIcon } from "./../../../resources/design-icons/dashboard-top-cards-icons";
import AttendanceIcon from "./../../../resources/design-images/dashboard-card-attendance.svg";
import PresenceIcon from "./../../../resources/design-images/dashboard-card-presence.svg";
import AttentionIcon from "./../../../resources/design-images/dashboard-card-attention.svg";
import DashboardAssessmentCard from "../../helpers/dashboard-assesment-card/DashboardAssessmentCard";
import HorizontalBarChartCard from "../../helpers/horizontal-bar-chart-card/HorizontalBarChartCard";
import RecordsTableCard from "../../helpers/records-table-card/RecordsTableCard";
import { useDispatch, useSelector } from "react-redux";
import { loadStaffSummary } from "./../../../store/staff/staff";
import TimerComponent from "../../helpers/timer/TimerComponent";
import { quickFilterChanged } from "../../../store/ui/filters/filters";

function AdminDashboard(props) {
  const { classes } = props;
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const openMenu = (e) => {
    setMenuAnchor(e.currentTarget);
  };

  const handleFilterChange = (val) => () => {
    dispatch(quickFilterChanged({ quickFilter: val }));
    setMenuAnchor(null);
    dispatch(loadStaffSummary({ quickFilter: val, dateFrom, dateTo }));
    setTimeRemaining(30);
  };

  const dispatch = useDispatch();
  const staff = useSelector((state) => state.entities.staff.list);
  const staffLoading = useSelector((state) => state.entities.staff.loading);
  const staffErr = useSelector((state) => state.entities.staff.error);
  const staffErrMsg = useSelector((state) => state.entities.staff.errorMessage);

  const quickFilter = useSelector(
    (state) => state.ui.filters.dashboardFilters.quickFilter
  );
  const dateFrom = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateFrom
  );
  const dateTo = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateTo
  );

  const getQueryParam = () => {
    return {
      quickFilter,
      dateFrom,
      dateTo,
    };
  };

  const getSelectedFilter = () => {
    switch (quickFilter) {
      case "d": {
        return `${format(new Date(), "dd MMM")} today`;
      }
      case "w": {
        return `Past Week`;
      }
      case "m": {
        return `Past Month`;
      }
    }
  };

  const handleToDateChange = (e) => {
    setToDate(e);
  };
  const handleFromDateChange = (e) => {
    setFromDate(e);
  };

  useEffect(() => {
    if (staff.length === 0) dispatch(loadStaffSummary(getQueryParam()));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.pageTopRow}>
        <div className={classes.pageInfo}>
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </div>
        <div className={classes.pageFilters}>
          <div>
            {/* <TimerComponent
              getQueryParam={getQueryParam}
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
            /> */}
          </div>
          <div className={classes.todayDateSelect} onClick={openMenu}>
            <Typography>{getSelectedFilter()}</Typography>
            {Boolean(menuAnchor) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
          <div className={classes.dateFilters}>
            <DateSelector
              title="To"
              value={toDate}
              onChange={handleToDateChange}
            />
            <DateSelector
              title="From"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className={classes.reportSelect}>
            <Typography>Report</Typography>
            <KeyboardArrowDown />
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.cardsContainer}>
        <div className={classes.pageLeftCardsContainer}>
          <div className={classes.pageTopCardsContainer}>
            <div className={classes.card}>
              <Backdrop className={classes.Backdrop} open={staffLoading}>
                <CircularProgress />
              </Backdrop>
              <DashboardTopCard
                title={"Attendance"}
                icon={AttendanceIcon}
                trend={staff.overAllStats?.attendancePercentage || 0}
                timeSpan={getSelectedFilter()}
                isTrendUp={false}
                count={staff.overAllStats?.presentCount || 0}
                totalCount={staff.overAllStats?.totalCount || 0}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" /> */}
            <div className={classes.card}>
              <Backdrop className={classes.Backdrop} open={staffLoading}>
                <CircularProgress />
              </Backdrop>
              <DashboardTopCard
                title={"Presence"}
                icon={PresenceIcon}
                trend={staff.overAllStats?.presencePercentage || 0}
                timeSpan={getSelectedFilter()}
                isTrendUp={true}
                count={staff.overAllStats?.presentCount || 0}
                totalCount={staff.overAllStats?.totalCount || 0}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" flexItem /> */}
            <div className={classes.card}>
              <Backdrop className={classes.Backdrop} open={staffLoading}>
                <CircularProgress />
              </Backdrop>
              <DashboardTopCard
                title={"Attention"}
                icon={AttentionIcon}
                trend={staff.overAllStats?.attentionPercentage || 0}
                timeSpan={getSelectedFilter()}
                isTrendUp={true}
                count={staff.overAllStats?.presentCount || 0}
                totalCount={staff.overAllStats?.totalCount || 0}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" /> */}
          </div>
          <div className={classes.recordsTableContainer}>
            <Backdrop className={classes.Backdrop} open={staffLoading}>
              <CircularProgress />
            </Backdrop>
            <RecordsTableCard
              cardTitle={"Staff"}
              tableData={staff.operators?.length > 0 ? staff.operators : []}
            />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classes.sideCardsContainer}>
          <div className={classes.assesmentCardContainer}>
            <Backdrop className={classes.Backdrop} open={staffLoading}>
              <CircularProgress />
            </Backdrop>
            <DashboardAssessmentCard
              title={"Presence time"}
              tableData={staff.operators?.length > 0 ? staff.operators : []}
            />
          </div>
          <div className={classes.barChartContainer}>
            <Backdrop className={classes.Backdrop} open={staffLoading}>
              <CircularProgress />
            </Backdrop>
            <HorizontalBarChartCard
              cardTitle={"Attention Percentage"}
              chartData={staff.operators?.length > 0 ? staff.operators : []}
            />
          </div>
        </div>
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
          <MenuItem onClick={handleFilterChange("d")}>
            {format(new Date(), "dd MMM")} today (1 Day)
          </MenuItem>
          <MenuItem onClick={handleFilterChange("w")}>1 Week</MenuItem>
          <MenuItem onClick={handleFilterChange("m")}>1 Month</MenuItem>
        </List>
      </Menu>
    </div>
  );
}

export default withStyles(styles)(AdminDashboard);
