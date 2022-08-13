import * as React from "react";
import { Avatar } from "@mui/material";

export default function PetCard({ pet }) {
    let diet =''
    pet.dietery.forEach((element, i) => {
        if (i === pet.dietery.length - 1) {
            diet += element;
        } else {
        diet += element +','+ ' '}
    })

    let aStatus = ''
    if (pet.adoptionStatus === 'Adopted') {
        aStatus = 'danger'} else if (pet.adoptionStatus === 'Fostered') {
            aStatus = 'warning'}
    else {aStatus = 'success'}


  return (
    <div className="border petCard me-2 mb-2">
      <div className="d-flex">
        <div>
          <Avatar
            className={`mt-3 ms-3 petAvatar-${aStatus}`}
            alt="Remy Sharp"
            src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg"
            sx={{ width: 120, height: 120 }}
          />
        </div>
        <div className="ms-4 mt-4 d-flex flex-column justify-content-evenly w-100">
            <div className="d-flex justify-content-between w-100">
                <div>
          <div> <span className="text-secondary">name:</span> <span className="text-success"><b>{pet.name}</b></span> </div>
          <div> <span className="text-secondary">type:</span>   <span className="text-success"><b>{pet.type}</b></span></div>
          <div><span className="text-secondary">breed:</span>  <span className="text-success"><b>{pet.breed}</b></span></div>
          </div>
          <div className="me-4 aStatus">
            <span className={`text-${aStatus}`}>{pet.adoptionStatus}</span>
          </div>
          </div>
          <div className="d-flex justify-content-start  w-100 ">
          <div><span className="text-secondary">height: </span><span className="text-success"><b>{pet.height}</b></span></div>
          <div className="ms-4"><span className="text-secondary">color: </span><span className="text-success"><b>{pet.color}</b></span></div>
          </div>
          <div className="d-flex ">
          <div><span className="text-secondary">weight: </span><span className="text-success"><b>{pet.weight}</b></span></div>
          <div className="ms-4"><span className="text-secondary">hypoallergnic: </span><span className="text-success"><b>{`${pet.hypoallergnic}`}</b></span>
        </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
      </div>
      <div className="ms-5 mt-2 mb-4 me-5">
      <div><span className="text-secondary">bio: </span><span className="text-success"><i>{`${pet.bio}`}</i></span></div>
      <div><span className="text-secondary">dietery: </span><span className="text-success"><i>{diet}</i></span></div>
      </div>
    </div>
  );
}
