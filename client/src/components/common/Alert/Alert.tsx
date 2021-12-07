import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/core/Icon/Icon';

export const AlertComponent = (props) => {
        const [open, setOpen] = useState<boolean>(true);
        const [showAlerts, setShowAlerts]=useState<boolean>(true)
        useEffect(() => {
                setTimeout(() => {
                  setShowAlerts(false);
                }, 10000);
              }, []);

        return (
                <>
                {showAlerts ?
                <Box sx={{ width: '100%' }}>
                        <Collapse in={open}>
                                <Alert severity="info">
                                        {props.messages}
                                </Alert>
                        </Collapse>
                </Box>
                : null }
                </>
        )
}
