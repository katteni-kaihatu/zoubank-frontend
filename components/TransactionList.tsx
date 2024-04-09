import {Transaction, useApplication} from "@/contexts/Application";
import {Box, Card, CardContent, Typography} from "@mui/material";

export type TransactionListProps = {
    incomingTransfers: Transaction[];
    outgoingTransfers: Transaction[];
}

function TransactionList(props: TransactionListProps) {
    const app = useApplication();
    const {incomingTransfers, outgoingTransfers} = props;
    // merge incoming and outgoing transfers
    const transactions = incomingTransfers.concat(outgoingTransfers);
    // sort by createdAt
    transactions.sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime();
    });


    return (
        <Box>
            {transactions.map((transaction) => {
                return (
                    <Card key={transaction.id}>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {transaction.createdAt.toLocaleString()}
                            </Typography>
                            <Typography sx={{fontSize: 14}}>
                                {transaction.senderUserId === app.userInfo?.id ? "送金" : "受取"}
                            </Typography>
                            <Typography>
                                {transaction.senderUserId === app.userInfo?.id ? transaction.recipientUserId : transaction.senderUserId}
                            </Typography>
                            <Typography>
                                {transaction.amount} 🐘
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
}

export default TransactionList;