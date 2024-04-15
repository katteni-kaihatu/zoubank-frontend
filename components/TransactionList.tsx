import {Transaction, useApplication} from "@/contexts/Application";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {useApi} from "@/contexts/Api";

export type TransactionListProps = {
    incomingTransfers: Transaction[];
    outgoingTransfers: Transaction[];
}



function TransactionList(props: TransactionListProps) {
    const app = useApplication();
    const api = useApi();
    const {incomingTransfers, outgoingTransfers} = props;
    // merge incoming and outgoing transfers
    const transactions = incomingTransfers.concat(outgoingTransfers);
    // sort by createdAt
    transactions.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    //最近５個の取引を表示
    transactions.splice(5);

    const getUsernameFromUserName = (username: string) => {
        if(username.startsWith("U-")) {
            api.getResoniteUserDataFromUserId(username).then((data) => {
                return data.username;
            })
        } else {
            return username;
        }
    }


    return (
        <Box display={"flex"} flexDirection={"column"} gap={2}>
            {transactions.map((transaction) => {
                return (
                    <Card key={transaction.id}>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {new Date(transaction.createdAt).toLocaleString()}
                            </Typography>
                            <Typography sx={{fontSize: 14}}>
                                {transaction.senderUserId === app.userInfo?.id ? "送金" : "受取"}
                            </Typography>
                            <Typography>
                                {transaction.senderUserId === app.userInfo?.id ? getUsernameFromUserName(transaction.recipient.resoniteUserId) : getUsernameFromUserName(transaction.sender.resoniteUserId) }
                            </Typography>
                            <Typography>
                                {transaction.amount} 🐘
                            </Typography>
                            { transaction.externalData?.memo &&
                                <Typography>
                                    {transaction.externalData?.memo}
                                </Typography>
                            }
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
}

export default TransactionList;