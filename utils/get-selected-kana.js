const getSelectedKana = (data, selectedRows) => {
    const result = [];
    Object.keys(selectedRows).forEach((type) => {
        const dataRows = data[type];
        const rows = selectedRows[type];
        if (!dataRows || !dataRows.length || !rows || !rows.length) return;
        rows.forEach((rowIdx) => {
            const row = dataRows[rowIdx];
            if (row && row.length) {
                result.push(...row.filter(k => k));
            }
        });
    });
    return result;
};

export default getSelectedKana;
