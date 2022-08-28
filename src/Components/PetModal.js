import * as React from "react";
import Modal from "@mui/material/Modal";
import { usePetContext } from "../Contexts/petContext";
import { Avatar } from "@mui/material";
import Box from '@mui/material/Box';
import PetCard from "./PetCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  ouline: "none",
  borderRadius: 5,
};

export default function PetModal() {
  const { openPetModal, handleClosePetModal, pet, addAdmin, } =
    usePetContext();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Modal
        open={openPetModal}
        onClose={handleClosePetModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={'d-flex justify-content-center'}>
        <PetCard pet={pet} modal={true} admin={addAdmin}/>
        </Box>
      </Modal>
    </div>
  );
}
