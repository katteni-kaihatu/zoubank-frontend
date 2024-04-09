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
import TransactionList from "@/components/TransactionList";

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
            <BankHeader />
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
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} gutterBottom>
                                    取引履歴
                                </Typography>
                               <TransactionList incomingTransfers={app.userInfo?.incomingTransfers || []} outgoingTransfers={app.userInfo?.outgoingTransfers || []} />
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