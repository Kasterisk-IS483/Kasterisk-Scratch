import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

export default function SpinnerOverlay({ showSpinner }) {
    return (
        <Spinner 
            visible={showSpinner} 
            textContent="Loading..." 
            textStyle={{ color: "#FFF" }} 
        />
    )
}