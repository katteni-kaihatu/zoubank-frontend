import {Header} from "@/components/Header";
import {
    AppBar, Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    CssBaseline, Grid, Menu, MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BankHeader from "@/components/BankHeader";
import {useApplication} from "@/contexts/Application";
import {useEffect, useState} from "react";
import {useApi} from "@/contexts/Api";

function IndexPage() {
    const app = useApplication()


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        console.log(app.appReady, app.loggedIn)
        if(app.appReady && !app.loggedIn) {
            location.href = '/login'
        }
    },[app])


    if(!app.appReady) return (<></>);

    return (
        <Box>
            <CssBaseline/>
            <Header/>
            <BankHeader>
                <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                    🐘銀 &nbsp;
                    <Typography variant={"subtitle1"} display={"inline"}>{app.userInfo?.branchName} {app.userInfo?.accountNumber}</Typography>
                </Typography>
                <Button variant={"text"} color={"inherit"} onClick={handleClick}>
                    <Typography>
                        kokoa0429
                    </Typography>
                    <ArrowDropDownIcon/>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>口座設定</MenuItem>
                    <MenuItem onClick={app.logout}>ログアウト</MenuItem>
                </Menu>
            </BankHeader>
            <Container sx={{paddingTop: 2, height: "100%"}} maxWidth={"md"}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8} display={"flex"} flexDirection={"column"} gap={1}>
                        <Card>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} gutterBottom>
                                    {app.userInfo?.branchName} {app.userInfo?.accountNumber}
                                </Typography>
                                <Typography sx={{fontSize: 36, textAlign: "right"}}>
                                    {app.userInfo?.balance} 🐘
                                </Typography>
                            </CardContent>
                        </Card>
                        <Box display={"flex"} gap={1}>
                            <Card>
                                <CardContent>
                                    おくる
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} gutterBottom>
                                    取引履歴
                                </Typography>
                                <Card elevation={1}>
                                    <CardContent>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            2021-10-01 12:00:00
                                        </Typography>
                                        <Typography sx={{fontSize: 14}}>
                                            送金
                                        </Typography>
                                        <Typography>
                                            kokoa0429
                                        </Typography>
                                        <Typography>
                                            1,000 🐘
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardContent>
                            <CardActions sx={{flexDirection: "row-reverse"}}>
                                <Button size="small">もっと見る</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
}

export default IndexPage;