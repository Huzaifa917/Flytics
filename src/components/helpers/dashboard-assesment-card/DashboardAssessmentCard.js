import { withStyles } from "@mui/styles";
import React from "react";
import styles from "./DashboardAssessmentStyles";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { formatTime } from "../../../utils/HelperFunctions";

// const data = [
//   {
//     _id: "62873adbfb897eead2cf63f7",
//     machineId: "machine1",
//     clientId: "62861f36d90dc52a2e850b93",
//     operatorName: "Taha",
//     timeSlotStart: "08:00",
//     timeSlotEnd: "14:00",
//     imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
//     assessmentTime: "15min",
//     rating: 10,
//     isRatingUp: true,
//   },
//   {
//     _id: "62873adbfb897eead2cf63f8",
//     machineId: "machine1",
//     clientId: "62861f36d90dc52a2e850b93",
//     operatorName: "Rehan Ali",
//     timeSlotStart: "08:00",
//     timeSlotEnd: "14:00",
//     imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
//     assessmentTime: "17min",
//     rating: 50,
//     isRatingUp: false,
//   },
//   {
//     _id: "62873adbfb897eead2cf63f9",
//     machineId: "machine1",
//     clientId: "62861f36d90dc52a2e850b93",
//     operatorName: "Afzal Haadi",
//     timeSlotStart: "08:00",
//     timeSlotEnd: "14:00",
//     imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
//     assessmentTime: "09min",
//     rating: 17,
//     isRatingUp: true,
//   },
//   {
//     _id: "62873adbfb897eead2cf63f10",
//     machineId: "machine1",
//     clientId: "62861f36d90dc52a2e850b93",
//     operatorName: "Akbar Sherazi",
//     timeSlotStart: "08:00",
//     timeSlotEnd: "14:00",
//     imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
//     assessmentTime: "13min",
//     rating: 22,
//     isRatingUp: false,
//   },
//   {
//     _id: "62873adbfb897eead2cf63f11",
//     machineId: "machine1",
//     clientId: "62861f36d90dc52a2e850b93",
//     operatorName: "Faisal Kaleem",
//     timeSlotStart: "08:00",
//     timeSlotEnd: "14:00",
//     imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
//     assessmentTime: "15min",
//     rating: 66,
//     isRatingUp: false,
//   },
//   {
//     _id: "62873adbfb897eead2cf63f12",
//     machineId: "machine1",
//     clientId: "62861f36d90dc52a2e850b93",
//     operatorName: "Taha Saeed",
//     timeSlotStart: "08:00",
//     timeSlotEnd: "14:00",
//     imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
//     assessmentTime: "20min",
//     rating: 87,
//     isRatingUp: true,
//   },
// ];

function DashboardAssessmentCard(props) {
  const { classes } = props;
  const { title, tableData } = props;
  const renderDataRecords = () => {
    const list = tableData.map((rec) => (
      <TableRow className={classes.dataRow} key={rec._id}>
        <TableCell>
          <div className={classes.employeeInfoContainer}>
            <Avatar src={rec.imageId} alt={rec.operatorName} />
            <div className={classes.nameRatingContainer}>
              <Typography className={classes.employeeName}>
                {rec.operatorName}
              </Typography>
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  borderRadius: "4px",
                  height: "3px",
                  backgroundColor: `${
                    rec.stats?.rating >= 8
                      ? "#1DE9B6"
                      : rec.stats?.rating >= 6
                      ? "#F2C203"
                      : "#F4542B"
                  }`,
                  width: `${
                    rec.stats?.rating * 10 < 100 ? rec.stats?.rating * 10 : 100
                  }%`,
                  alignSelf: "flex-start",
                }}
              />
            </div>
          </div>
        </TableCell>
        <TableCell className={classes.time}>{formatTime(rec.stats?.presentTime)}</TableCell>
      </TableRow>
    ));
    return list;
  };
  return (
    <div className={classes.root}>
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <Typography className={classes.cardTitile}>{title}</Typography>
        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableBody className={classes.dataContainer}>
            {renderDataRecords()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(DashboardAssessmentCard);
