import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { usePetContext } from "../Contexts/petContext";
import axios from "axios";
import { baseUrl } from "../Contexts/authContexts";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { orange } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export default function NewsFeed() {
  const { openNews, handleCloseNews } = usePetContext();
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/pets/news`, {
        withCredentials: true,
      });
      setNews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [openNews]);

  return (
    <div>
      <Modal
        open={openNews}
        onClose={handleCloseNews}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {news?.map((item) => (
            <div key={nanoid()} className='mt-1'>
              <span className="me-3 ms-2">
                <AddAlertIcon
                  sx={{
                    color: orange[800],
                  }}
                />
              </span>
              <span className="text-success"><b>{item.news}</b></span>
              {/* <span>{`${item.dateCreated}`}</span> */}
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
