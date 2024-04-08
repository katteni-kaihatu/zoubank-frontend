import {Header} from "@/components/Header";
import {
    AppBar, Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    CssBaseline, Grid,
    Toolbar,
    Typography
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function IndexPage() {
    return (
        <Box>
            <CssBaseline/>
            <Header/>
            <AppBar position="relative"  color={"primary"} elevation={1}>
                <Container>
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                            🐘銀 ここあ支店 1754234
                        </Typography>
                        <Button variant={"text"} color={"inherit"}>
                            <Typography>
                                kokoa0429
                            </Typography>
                            <ArrowDropDownIcon/>
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container sx={{paddingTop: 2, height: "100%"}} maxWidth={"md"}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8} display={"flex"} flexDirection={"column"} gap={1}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    ここあ支店 1754234
                                </Typography>
                                <Typography sx={{ fontSize: 36, textAlign: "right" }}>
                                    1,000 🐘
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
                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    取引履歴
                                </Typography>
                                <Card elevation={1}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            2021-10-01 12:00:00
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }}>
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