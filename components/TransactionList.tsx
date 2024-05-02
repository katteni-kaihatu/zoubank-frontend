import { Transaction, useApplication } from "@/contexts/Application";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useApi } from "@/contexts/Api";
import { useEffect, useMemo, useState } from "react";
import { Zou } from "@/components/Zou";

const usernameCache = new Map<
  string,
  Promise<{ data: string; updatedAt: number }>
>();
const useUsername = (userId: string) => {
  const api = useApi();
  const [username, setUserName] = useState<string>();
  useEffect(() => {
    if (userId.startsWith("U-")) {
      (async () => {
        try {
          const cachePromise = usernameCache.get(userId);
          const cached = cachePromise ? await cachePromise : undefined;

          if (cached && Date.now() - cached.updatedAt < 1000 * 60 * 60) {
            setUserName(cached.data);
            return;
          }

          const request = (async () => {
            try {
              const { username } =
                await api.getResoniteUserDataFromUserId(userId);
              return { data: username, updatedAt: Date.now() };
            } catch (e) {
              console.error(e);
              return { data: userId, updatedAt: Date.now() };
            }
          })();

          usernameCache.set(userId, request);

          setUserName((await request).data);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [api, userId]);

  return username ?? userId;
};

function TransactionElement(props: {
  senderUserId: string;
  transaction: Transaction;
}) {
  const app = useApplication();
  const username = useUsername(
    props.transaction.senderUserId === props.senderUserId
      ? props.transaction.recipient.resoniteUserId
      : props.transaction.sender.resoniteUserId,
  );

  return (
    <Card key={props.transaction.id}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {new Date(props.transaction.createdAt).toLocaleString()}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {props.transaction.senderUserId === app.userInfo?.id
            ? "送金"
            : "受取"}
        </Typography>
        <Typography>{username}</Typography>
        <Typography>
          {props.transaction.amount} <Zou width="18px" height="18px" />
        </Typography>
        {props.transaction.externalData?.memo && (
          <Typography>{props.transaction.externalData?.memo}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export type TransactionListProps = {
  incomingTransfers: Transaction[];
  outgoingTransfers: Transaction[];
};

function TransactionList(props: TransactionListProps) {
  const app = useApplication();

  const { incomingTransfers, outgoingTransfers } = props;
  const transactions = useMemo(
    () =>
      incomingTransfers
        .concat(outgoingTransfers)
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
        .slice(0, 5),
    [incomingTransfers, outgoingTransfers],
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {transactions.map((transaction) => {
        return (
          <TransactionElement
            key={transaction.id}
            senderUserId={app.userInfo?.id || ""}
            transaction={transaction}
          />
        );
      })}
    </Box>
  );
}

export default TransactionList;
