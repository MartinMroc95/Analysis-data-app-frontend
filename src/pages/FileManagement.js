import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Select from 'react-select'

import { Button, Typography, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { DialogContentText, DialogActions, makeStyles, Grid, Divider, Box } from '@material-ui/core'

import { initCOCO2Chart } from '../components/Charts/COCO2Chart'
import CustomizedButton from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import MyAlert from '../components/Alert'

import { fetchAllData } from '../api/getCalls'
import { postUpdatedStatus, deleteSelectedFile } from '../api/postCalls'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
    chartBox: {
        display: 'flex',
        maxWidth: '1460px',
        width: '100%',
        height: '79vh',
    },
    chart: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
}))

const selectStyles = {
    control: (styles, { isFocused }) => ({
        ...styles,
        borderRadius: '2px',
        backgroundColor: 'white',
        cursor: 'pointer',
        maxWidth: '300px',
        border: isFocused ? '1px solid #ccc' : '1px solid #ccc',
        lineHeight: 1.5,
        boxShadow: isFocused ? '0 0 0 1px #ccc' : '',

        '&:visited': {
            boxShadow: '0 0 0 1px #ccc',
        },
        '&:hover': {
            borderColor: 'none',
        },
    }),
    menu: (styles) => {
        return {
            ...styles,
            maxWidth: '300px',
            borderRadius: '2px',
        }
    },
    option: (styles, { data, isDisabled, isSelected }) => {
        return {
            ...styles,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: isSelected ? '#f1f3f5' : '',
            color: 'black',
            maxWidth: '300px',
            '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled && (isSelected ? data.color : 'white'),
            },
        }
    },
}

const FileManagement = () => {
    const classes = useStyles()

    const [datas, setDatas] = useState([])
    const [selectedFile, setSelectedFile] = useState('')
    const [fileStatus, setFileStatus] = useState('')

    const [showDialog, setShowDialog] = useState(false)
    const [showDialogForDelete, setShowDialogForDelete] = useState(false)

    const [alert, setAlert] = useState({ type: '', message: '', isOpen: false })
    const [optionsForSelect, setOptionsForSelect] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAllData(setDatas, setIsLoading, setAlert)
    }, [])

    useEffect(() => {
        datas.map((data) => setOptionsForSelect((current) => [...current, { value: data, label: data.name }]))
    }, [datas])

    const updateSelectedFile = useCallback(
        (payload) => {
            setFileStatus(payload.status)
            initCOCO2Chart(payload)
        },
        [setFileStatus]
    )

    const onStatusClick = (selectedStatus) => {
        postUpdatedStatus(selectedFile, selectedStatus, setFileStatus, setShowDialog)
    }

    const onDeleteClick = () => {
        deleteSelectedFile(selectedFile, setShowDialogForDelete)
    }

    const onSelectClick = (value) => {
        if (value === null) {
            setSelectedFile('')
            return
        }
        setSelectedFile(value.value)
        updateSelectedFile(value.value)
    }

    const onCloseClick = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setAlert((current) => ({ ...current, isOpen: false }))
    }

    if (isLoading === true) {
        return <LoadingSpinner loading={isLoading}>Loading data from database...</LoadingSpinner>
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <MyAlert
                open={alert.isOpen}
                onClose={onCloseClick}
                severity={alert.type}
                message={alert.message}
                autoHideDuration={5000}
            />

            <Fragment>
                <Grid item xs={12}>
                    <Typography gutterBottom style={{ fontWeight: 'bold' }}>
                        Select file from database
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={2} className={classes.select}>
                    <Select
                        isClearable
                        isSearchable
                        styles={selectStyles}
                        options={optionsForSelect}
                        onChange={(value) => onSelectClick(value)}
                    ></Select>
                </Grid>
                <Grid item xs={12} sm={12} md={10} style={{ display: 'flex', alignItems: 'center' }}>
                    <CustomizedButton buttoncolor="success" onClick={() => onStatusClick('Vyhovujúci')}>
                        Correct
                    </CustomizedButton>
                    <CustomizedButton buttoncolor="error" onClick={() => onStatusClick('Nevyhovujúci')}>
                        Incorrect
                    </CustomizedButton>
                    <CustomizedButton buttoncolor="remove" onClick={() => onDeleteClick()}>
                        Delete
                    </CustomizedButton>
                    <CustomizedButton
                        buttoncolor="text"
                        style={{
                            width: '190px',
                            color: '#000018',
                            fontWeight: 'bold',
                        }}
                    >
                        File status:
                        <span
                            style={
                                fileStatus === 'Vyhovujúci'
                                    ? {
                                          color: 'rgba(16, 185, 129, 1)',
                                          paddingLeft: '5px',
                                          fontWeight: 'bold',
                                      }
                                    : {
                                          color: 'rgba(239, 68, 68, 1)',
                                          paddingLeft: '5px',
                                          fontWeight: 'bold',
                                      }
                            }
                        >
                            {fileStatus || ''}
                        </span>
                    </CustomizedButton>
                </Grid>
            </Fragment>

            <Grid
                item
                className={classes.chartBox}
                style={selectedFile === '' ? { display: 'none' } : { display: 'flex' }}
            >
                <Box className={classes.chart}>
                    <canvas id="myChartCOCO2"></canvas>
                </Box>

                <Dialog
                    open={showDialog === true}
                    onClose={() => setShowDialog(false)}
                    aria-labelledby="customized-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{'Status changed'}</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText style={{ margin: 0 }} id="alert-dialog-description">
                            File status has been changed successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDialog(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={showDialogForDelete === true}
                    onClose={() => setShowDialogForDelete(false)}
                    aria-labelledby="customized-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{'Status changed'}</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText style={{ margin: 0 }} id="alert-dialog-description">
                            File has been deleted successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDialogForDelete(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    )
}

export default FileManagement
