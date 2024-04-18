import {Transaction, useApplication} from "@/contexts/Application";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {useApi} from "@/contexts/Api";
import {useState} from "react";
import {Zou} from "@/components/Zou";

export type TransactionListProps = {
    incomingTransfers: Transaction[];
    outgoingTransfers: Transaction[];
}



function TransactionList(props: TransactionListProps) {
    const app = useApplication();
    const api = useApi();

    const [userNames, setUserNames] = useState<any>({});

    const {incomingTransfers, outgoingTransfers} = props;
    // merge incoming and outgoing transfers
    const transactions = incomingTransfers.concat(outgoingTransfers);
    // sort by createdAt
    transactions.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    //最近５個の取引を表示
    transactions.splice(5);

    const fetchUsernames = async (transactions: Transaction[]) => {
        const ids = transactions.map(t => t.senderUserId === app.userInfo?.id ? t.recipient.resoniteUserId : t.sender.resoniteUserId);
        const uniqueIds = Array.from(new Set(ids));
        const names : any = {};

        await Promise.all(uniqueIds.map(async (id) => {
            if(id.startsWith("U-")) {
                const result = await api.getResoniteUserDataFromUserId(id);
                names[id] = result.username;
            } else {
                names[id] = id;
            }
        }));

        setUserNames(names); // 状態更新
    };

    fetchUsernames(transactions);

    const getUsernameFromId = (id: string) => {
        return userNames[id] || id; // キャッシュされた名前またはIDを返す
    };


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
                                {transaction.senderUserId === app.userInfo?.id ?
                                    getUsernameFromId(transaction.recipient.resoniteUserId) :
                                    getUsernameFromId(transaction.sender.resoniteUserId) }
                            </Typography>
                            <Typography>
                                {transaction.amount} <Zou width={"18px"} height={"18px"}/>
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