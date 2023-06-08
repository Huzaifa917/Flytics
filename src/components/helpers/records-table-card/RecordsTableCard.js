import { MoreVertRounded } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import {
  fixFloat,
  getStaffImage,
  trimId,
} from "../../../utils/HelperFunctions";
import { StaffTableData } from "../../../utils/SampleData";
import PercentageCell from "../percentage-cell/PercentageCell";
import RatingPill from "../rating-pill/RatingPill";
import styles from "./RecordsTableStyles";

function RecordsTableCard(props) {
  const { classes } = props;
  const { cardTitle, tableData } = props;
  const data = tableData;

  const renderDataRows = () => {
    if (!tableData || !tableData.length)
      return (
        <TableRow className={classes.dataRow}>
          <TableCell colSpan={7}>No Data to Show</TableCell>
        </TableRow>
      );
    else {
      const list = tableData?.map((rec) => (
        <TableRow className={classes.dataRow} key={rec._id}>
          <TableCell>{rec.stats?.lastUpdated ? rec.stats?.lastUpdated.split(' ')[1] : "N/A"}</TableCell>
          <TableCell>
            <Avatar src={getStaffImage(rec.imageId)} alt={rec.operatorName} />
          </TableCell>
          <TableCell>
            <div>
              <Typography>{rec.operatorName}</Typography>
              <Typography>{rec.leadTags?.map((tag) => tag + ", ")}</Typography>
            </div>
          </TableCell>
          <TableCell>
            <PercentageCell
              percentage={fixFloat(0, rec.stats?.attendancePercentage)}
            />
          </TableCell>
          <TableCell>
            <PercentageCell
              percentage={fixFloat(0, rec.stats?.presencePercentage)}
            />
          </TableCell>
          <TableCell>
            <PercentageCell
              percentage={fixFloat(0, rec.stats?.attentionPercentage)}
            />
          </TableCell>
          <TableCell align="center">
            <RatingPill rating={fixFloat(0, rec.stats?.rating)} />
          </TableCell>
        </TableRow>
      ));
      return list;
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <Typography className={classes.cardTitile}>{cardTitle}</Typography>
        <IconButton>
          <MoreVertRounded />
        </IconButton>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableCell>Last Updated</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Presence</TableCell>
            <TableCell>Attention</TableCell>
            <TableCell align="center">Rating</TableCell>
          </TableHead>
          <TableBody>{renderDataRows()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(RecordsTableCard);
