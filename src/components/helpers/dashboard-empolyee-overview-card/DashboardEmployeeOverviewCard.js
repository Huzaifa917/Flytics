import { KeyboardArrowDown, KeyboardArrowUp, MoreVertRounded } from '@mui/icons-material';
import { IconButton, Typography, Avatar, Divider } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState } from 'react';
import { trimId } from '../../../utils/HelperFunctions';
import ContactInfoCard from '../contact-info-card/ContactInfoCard';
import RatingCard from '../rating-card/RatingCard';
import StatsCard from '../stats-card/StatsCard';
import styles from './DashboardEmployeeOverviewCardStyles';

function DashboardEmployeeOverviewCard(props) {
    const { classes } = props;
    const { cardTitle, filterData, employee } = props;

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(filterData ? filterData[0].value : "");

    const handleOptionChange = e => {
        setSelectedOption(e.target.value);
    };

    const renderOptions = () => {
        const list = filterData?.map((opt, idx) => (
            <option key={idx} value={opt.value} onClick={handleOptionChange}>
                {opt.text}
            </option>
        ));
        return list;
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
            <div className={classes.cardDataContainer}>
                <div className={classes.cardFilterDataSelect} onClick={() => setOpen(!open)}>
                    <Typography>
                        {selectedOption}
                    </Typography>
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    <div className={`${classes.selectOptions} ${open ? "" : classes.hidden}`}>
                        {renderOptions()}
                    </div>
                </div>
            </div>
            <div className={classes.employeeInfoContainer}>
                <div className={classes.infoCardTopRow}>
                    <Avatar
                        src={employee.imageId}
                        alt={employee.operatorName}
                    />
                    <div className={classes.infoRow}>
                        <div className={classes.infoColumn}>
                            <Typography className={classes.infoHeading}>Designation</Typography>
                            <Typography className={classes.infoText}>{employee.operatorName}</Typography>
                        </div>
                        <div className={classes.infoColumn}>
                            <Typography className={classes.infoHeading}>ID</Typography>
                            <Typography className={classes.infoText}>{trimId(employee._id)}</Typography>
                        </div>
                    </div>
                </div>
                <Divider flexItem />
                <div className={classes.ratingCardContainer}>
                    <RatingCard rating={employee.rating} />
                </div>
                <div className={classes.statsContainer}>
                    <StatsCard
                        statTitle={'Attendance'}
                        statValue={employee.attendancePercentage + ' %'}
                        statInfo={"online"}
                    />
                    <StatsCard
                        statTitle={'Presence'}
                        statValue={employee.presencePercentage + ' %'}
                        statInfo={"300 mins"}
                    />
                    <StatsCard
                        statTitle={'Attention'}
                        statValue={employee.attentionPercentage + ' %'}
                        statInfo={"294 mins"}
                    />
                </div>
            </div>
            <div>
                <ContactInfoCard
                    contactNo={employee.contactNo || '+92-123-123-123'}
                    email={employee.email || 'employe.mail@email.com'}
                    timeSlotStart={employee.timeSlotStart}
                    timeSlotEnd={employee.timeSlotEnd}
                />
            </div>
        </div >
    );
}

export default withStyles(styles)(DashboardEmployeeOverviewCard);