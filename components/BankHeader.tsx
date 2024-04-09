import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export type BankHeaderProps = {
    children: React.ReactNode
}

function BankHeader(props: BankHeaderProps) {
  return (
      <AppBar position="relative"  color={"primary"} elevation={1}>

          <Container>
              <Toolbar variant="dense">
          {props.children}
              </Toolbar>
            </Container>
      </AppBar>
  );
}

export default BankHeader;