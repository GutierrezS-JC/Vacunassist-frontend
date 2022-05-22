import React from 'react';
import { Spinner, Row } from 'react-bootstrap';

export const SpinnerLoading = () => {
    return (
        <Row className="align-items-center justify-content-center mt-4">
            <Spinner animation="border" role="status" />
        </Row>
    )
}