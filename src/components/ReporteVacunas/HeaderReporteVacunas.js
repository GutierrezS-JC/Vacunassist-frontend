import { Row,Col, ToggleButton } from "react-bootstrap";
import { useState } from "react";

export const HeaderReporteVacunas = ({handleClickedSelector, checkedCovid, checkedYellow, checkedColdWar}) => {
    return(
        <>
            <h1 className="display-5">Reporte de vacunas</h1>
            <div className="mt-3">
                <ToggleButton
                    className="mb-2"
                    id="toggle-check-covid"
                    type="checkbox"
                    variant={checkedCovid ? "success" : "outline-success"}
                    value="1"
                    name="covidButton"
                    onClick={(e) => handleClickedSelector(e)}
                >
                Covid
                </ToggleButton>

                <ToggleButton
                    className="mb-2 ms-2"
                    id="toggle-check-coldwar"
                    type="checkbox"
                    variant={checkedColdWar ? "primary" : "outline-primary"}
                    value="2"
                    name="gripeButton"
                    onClick={(e) => handleClickedSelector(e)}
                >
                Gripe
                </ToggleButton>

                <ToggleButton
                    className="mb-2 ms-2"
                    id="toggle-check-yellow"
                    type="checkbox"
                    variant={checkedYellow ? "warning" : "outline-warning"}
                    value="3"
                    name="amarillaButton"
                    onClick={(e) => handleClickedSelector(e)}
                >
                Amarilla
                </ToggleButton>
            </div>
        </>
    )
}