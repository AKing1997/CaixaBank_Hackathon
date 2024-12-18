import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ExportButton = React.memo(function ExportButton({
    data,
    filename = 'data.csv',
    headers,
    label = 'Export CSV'
}) {
    const handleExport = useCallback(() => {
        // Convert data to CSV format
        // Instructions:
        // - Use the convertArrayOfObjectsToCSV function to convert the data array to a CSV string.
        const csv = convertArrayOfObjectsToCSV();
        if (!csv) return;
        // - Create a Blob object with CSV content
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        // - Create a temporary link to download the file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [data, filename, headers]);

    // Function to convert object array to CSV
    // Instructions:
    // - Implement logic to convert an array of objects into a CSV string.
    // - Ensure the headers are used to extract the correct fields from each object in the data array.
    const convertArrayOfObjectsToCSV = () => {
        // Implement the conversion logic here
        if (!data || data.length === 0) return null;

        const csvRows = [headers.join(",")];

        data.forEach((item) => {
          const row = headers.map((header) => {
            const value = item[header] || "";
            return `"${value.toString().replace(/"/g, '""')}"`;
          });
          csvRows.push(row.join(","));
        });
    
        return csvRows.join("\n");
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label || 'Export CSV'}
        </Button>
    );
});

// Define types of props for better verification and documentation
ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
};

// // Define default props
// ExportButton.defaultProps = {
//     filename: 'data.csv',
//     label: 'Export CSV',
// };

export default ExportButton;
