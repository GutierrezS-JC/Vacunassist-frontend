import { Row,Col, ToggleButton, Form, Button } from "react-bootstrap";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/reporteVacunas.css';

export const HeaderReporteVacunas = ({ handleSearchSubmit, unclicked, generarListado, handleDateChange, vacunatorios, iSearchedButton,
     handleChange, searchForm, handleClickedSelector, checkedCovid, checkedYellow, checkedColdWar}) => {
    return(
        <>
            <h1 className="display-5">Reporte de vacunas</h1>
            <Form onSubmit={(e) => e.preventDefault()} className="searchForm">
                <Row>
                    <Form.Group className="mb-3 col-12 col-sm-12">
                    <Form.Label>DNI:</Form.Label>
                        {
                            !iSearchedButton ? <input onChange={handleChange} value={searchForm.pacienteDni} className="form-control" type="text" placeholder="DNI" name="pacienteDni"></input>
                            :  <input disabled onChange={handleChange} value={searchForm.pacienteDni} className="form-control" type="text" placeholder="DNI" name="pacienteDni"></input>
                        }
                        <Form.Text className="text-muted">
                            Input opcional
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3 col-12 col-sm-12">
                        <Form.Label>Vacunatorio:</Form.Label>
                        {
                            !iSearchedButton ?  
                            <Form.Select name="vacunatorioId" value={searchForm.vacunatorioId} onChange={handleChange}>
                                <option key={`Vacunatorio_Empty`} value={0}> - </option>
                                {vacunatorios.map((vacunatorio, index)=>{
                                    return(
                                        <option key={`Vacunatorio${index}`} value={vacunatorio.id}>{vacunatorio.nombre}</option>
                                    )
                                })}
                            </Form.Select>
                            :
                            <Form.Select disabled name="vacunatorioId" value={searchForm.vacunatorioId} onChange={handleChange}>
                                <option key={`Vacunatorio_Empty`} value={0}> - </option>
                                {vacunatorios.map((vacunatorio, index)=>{
                                    return(
                                        <option key={`Vacunatorio${index}`} value={vacunatorio.id}>{vacunatorio.nombre}</option>
                                    )
                                })}
                            </Form.Select>
                        }
                        <Form.Text className="text-muted">
                                Input opcional
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Fecha Inicio:</Form.Label>
                        {
                            !iSearchedButton ?  
                                <DatePicker 
                                    name="fechaInicio"
                                    selected={searchForm.fechaInicio}
                                    onChange={(date) => handleDateChange(date, "fechaInicio")} 
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="estiloCalendarV2"
                                    as={Col}
                                    locale="es"
                                    lg={6}
                                />
                            :
                                <DatePicker 
                                    disabled
                                    name="fechaInicio"
                                    selected={searchForm.fechaInicio}
                                    onChange={(date) => handleDateChange(date, "fechaInicio")} 
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="estiloCalendarV2"
                                    as={Col}
                                    locale="es"
                                    lg={6}
                                />
                        }
                         <Form.Text className="text-muted">
                            Input obligatorio
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Fecha Fin:</Form.Label>
                        {
                            !iSearchedButton ? 
                                <DatePicker 
                                    name="fechaFin"
                                    selected={searchForm.fechaFin}
                                    onChange={(date) => handleDateChange(date, "fechaFin")} 
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="estiloCalendarV2"
                                    as={Col}
                                    locale="es"
                                    lg={6}
                                />
                            :
                                <DatePicker 
                                    disabled
                                    name="fechaFin"
                                    selected={searchForm.fechaFin}
                                    onChange={(date) => handleDateChange(date, "fechaFin")} 
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="estiloCalendarV2"
                                    as={Col}
                                    locale="es"
                                    lg={6}
                                />
                        }
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3 col-12 col-sm-12">
                        <Form.Label>Vacuna:</Form.Label>
                        <div>
                            {
                            !iSearchedButton ? 
                                <>
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
                                </>
                            :
                                <>
                                    <ToggleButton
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                </>
                            }
                        </div>
                        <Form.Text className="text-muted">
                            Input obligatorio
                        </Form.Text>
                    </Form.Group>
                </Row>
                {
                    ! iSearchedButton ? 
                        <Button variant="success" id="generar" onClick={handleSearchSubmit}>Generar reporte</Button>
                    :
                        <Button variant="dark" id="volver" onClick={unclicked}> Volver </Button>
                }
            </Form>
        </>
    )
}