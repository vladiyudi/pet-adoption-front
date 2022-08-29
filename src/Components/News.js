import React from 'react'
import axios from "axios";
import { baseUrl } from "../Contexts/authContexts";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { orange } from "@mui/material/colors";

export default function News({openNews}) {
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
        {news?.map((item) => (
            <div key={nanoid()} className='mt-1 pt-2 pb-2'>
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
    </div>
  )
}
