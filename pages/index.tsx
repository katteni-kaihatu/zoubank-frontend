import {Header} from "@/components/Header";
import {
    AppBar, Box,
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    Container,
    CssBaseline, Grid, Menu, MenuItem, TextField,
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


    useEffect(() => {
        console.log(app.appReady, app.loggedIn)
        if(app.appReady && !app.loggedIn) {
            location.href = '/login'
        }
    },[app])

    const [sendTo, setSendTo] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)


    if(!app.appReady || !app.loggedIn) return (<></>);

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

                        <Card>
                            <CardHeader title={"送金"} />
                            <CardContent>
                                <Box display={"flex"} flexDirection={"column"} gap={1}>
                                    <TextField label={"送金先(UserID U-...)"} fullWidth size={"small"} value={sendTo} onChange={(e) => setSendTo(e.target.value)}/>
                                    <TextField label={"金額"} fullWidth size={"small"} value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} error={amount > parseInt(app.userInfo?.balance || "0")} type={"number"} helperText={amount > parseInt(app.userInfo?.balance || "0") ? "残高を超えています" : ""}/>
                                    <Button variant={"contained"} fullWidth onClick={() => {
                                        app.sendTransaction(sendTo, amount)
                                    }}>
                                        送金する
                                    </Button>
                                </Box>
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