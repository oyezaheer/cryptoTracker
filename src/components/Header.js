import React, { useEffect } from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const { currency, setCurrency, user } = CryptoState();
  const history = useHistory();
  // const [hasNotifications, setHasNotifications] = useState(false);

  // Assuming you have user data from Firebase or another authentication service
  // const workspaceKey = "E5wMnrBAte0bsSUePpl0"; // Replace with your actual workspace key from SuprSend
  // const subscriberId = user?.uid || "default_subscriber_id"; // Replace with your logic to get the user ID
  // const distinctId = user?.email || "default_distinct_id"; // Replace with your logic to get the distinct ID (could be the email)

  // console.log(distinctId);
  // // Debugging
  // useEffect(() => {
  //   console.log(`Subscriber ID: ${subscriberId}`);
  //   console.log(`Distinct ID: ${distinctId}`);
  // }, [subscriberId, distinctId]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              style={{ flex: 1, color: "gold", fontFamily: "Montserrat", fontWeight: "bold", cursor: "pointer" }}
            >
              Crypto Hunter
            </Typography>

            {/* Debugging and Visibility Check */}
            <div style={{ position: 'relative' }}>
              <SuprSendInbox
                themeType="dark"
                // workspaceKey={workspaceKey}
                // subscriberId={subscriberId}
                // distinctId={distinctId}
                workspaceKey="E5wMnrBAte0bsSUePpl0"
                subscriberId="user?.uid"
                distinctId="user?.email"
                />
             
            </div>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 85, height: 40, marginLeft: '10px' }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
