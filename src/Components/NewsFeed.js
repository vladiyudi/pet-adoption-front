import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import News from "./News";
import { usePetContext } from "../Contexts/petContext";
import Chat from "./Chat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  overflow: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export default function NewsFeed() {
  const { openNews, handleCloseNews, chat } = usePetContext();

  return (
    <div>
      <Modal
        open={openNews}
        onClose={handleCloseNews}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!chat && <News openNews={openNews}/>}
          {chat && <Chat chat={chat}/>}
        </Box>
      </Modal>
    </div>
  );
}
