import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { profilerData } from '../utils/profilerData';

function DownloadProfilerData() {
    // Handle download functionality
    const handleDownload = () => {
        if (profilerData.length === 0) {
            // - First, check if there is any profiler data available.
            // - If there is no data, alert the user that there is nothing to download.
            alert("There is no profiler data available to download.");
            return;
        }

        // - If data is available, convert the data to a JSON format.
        const dataStr = JSON.stringify(profilerData, null, 2);
        // - Create a Blob from the JSON string and generate a URL for the Blob.
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        // - Create a temporary link element to trigger the download.
    	const a = document.createElement("a");
	    a.href = url;
	    a.download = "profilerData.json";
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a)
	    URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download Profiler Data
        </Button>
    );
}

export default DownloadProfilerData;