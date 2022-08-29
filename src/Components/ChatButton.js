import React from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Checkbox from '@mui/material/Checkbox';
import { blue } from "@mui/material/colors";
import { usePetContext } from '../Contexts/petContext';
import TextsmsIcon from '@mui/icons-material/Textsms';

export default function ChatButton() {
    const {openChat} = usePetContext()
  return (
    <div className='chatBut'>
        <Checkbox onChange={openChat} icon={<TextsmsIcon  sx={{
        color: blue [800],
        fontSize: 60 ,
      }}/>} checkedIcon={<TextsmsIcon  sx={{
        color: blue [800],
        fontSize: 60 ,
      }}/>} />
      </div>
  )
}
