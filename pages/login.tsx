import { Header } from "@/components/Header";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import BankHeader from "@/components/BankHeader";
import React, { useEffect } from "react";
import { useApi } from "@/contexts/Api";
import { useApplication } from "@/contexts/Application";

function LoginPage() {
  const app = useApplication();
  const api = useApi();

  const handleLogin = () => {
    location.href = `https://auth.resonite.love?link=${location.origin}/login&linkType=REDIRECT`;
  };

  // リダイレクトされて戻ってきて、QueryにRLTokenがあるとき、ログイン処理を行う
  useEffect(() => {
    const url = new URL(location.href);
    const RLToken = url.searchParams.get("RLToken");
    console.log(RLToken);
    if (RLToken) {
      // urlからRLTokenをけす
      url.searchParams.delete("RLToken");
      history.replaceState(null, "", url.toString());
      api.login(RLToken).then((result) => {
        if (result) {
          location.href = "/";
        }
      });
    }
  }, []);

  if (!app.appReady) return <></>;

  return (
    <Box>
      <Header />
      <BankHeader>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          🐘銀 ログイン
        </Typography>
      </BankHeader>
      <Container maxWidth="xs" sx={{ paddingTop: 3 }}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // 中央揃え
            }}
          >
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              ログイン
            </Typography>
            <Button variant="contained" onClick={handleLogin}>
              Resonite.loveでログイン
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LoginPage;
