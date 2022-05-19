import { Link } from "react-router-dom";

export const Footer =() =>{
    return(
        <div className="dark-theme text-white text-center text-lg-start mt-5">
            <div className="text-center p-3 font-weight-lighter" style={{ backgroundColor: "#00000080" }}>
                © 2022 Copyright:{' '}
                <Link to="/" className="text-white" >Vacunassist</Link>
            </div>
        </div>
    )
}