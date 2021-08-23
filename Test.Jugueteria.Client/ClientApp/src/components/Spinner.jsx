import React from 'react';
import './Spinner.css';

const Spinner = ({ show }) => {

    if (show){
        removeNone();
        return (
            <div className="subloader active">
                <div className="relative"></div>
                {/* <button onClick={()=>{window.location.reload()}} className="reloadLate btn btn-primary none"><i className="fa fa-undo"></i> Recargar</button> */}
            </div>
        )
    }
    else
        return (
            <div className="subloader">
                <div className="relative"></div>
            </div>
        )
}
function removeNone(){
    setTimeout(() => {
        if(document.querySelector(".reloadLate"))
            document.querySelector(".reloadLate").classList.remove('none')
    }, 10000);
}

export default Spinner;