import ExcelJS from "exceljs";

const normalizeXlsxFileName = (name) => {
  const base = (name ?? "").trim();
  if (!base) return "records.xlsx";
  return base.toLowerCase().endsWith(".xlsx") ? base : `${base}.xlsx`;
};

export const downloadXlsx = async (rows, filename) => {
  if (!Array.isArray(rows) || rows.length === 0) return;

  const headers = [
    { key: "pilot_name", header: "Pilot", width: 18 },
    { key: "surname", header: "Surname", width: 18 },
    { key: "event", header: "Event", width: 18 },
    { key: "name_circuits", header: "Circuit", width: 28 },
    { key: "category", header: "Category", width: 18 },
    { key: "date", header: "Date", width: 12 },
    { key: "time", header: "Time", width: 12 },
    { key: "tire_n1", header: "Tire 1", width: 10 },
    { key: "tire_n2", header: "Tire 2", width: 10 },
    { key: "tire_n3", header: "Tire 3", width: 10 },
    { key: "tire_n4", header: "Tire 4", width: 10 },
    { key: "tire_n5", header: "Tire 5", width: 10 },
    { key: "tire_n6", header: "Tire 6", width: 10 },
  ];

  const getDate = (event_date) => String(event_date).split("T")[0] || "";
  const getTime = (event_date) =>
    (String(event_date).split("T")[1] || "").split(".")[0] || "";

  const wb = new ExcelJS.Workbook();
  wb.creator = "Cba Pista";
  wb.created = new Date();

  const TABLE_HEADER_ROW = 9;
  const DATA_START_ROW = TABLE_HEADER_ROW + 1;

  const ws = wb.addWorksheet("Records", {
    views: [{ state: "frozen", ySplit: TABLE_HEADER_ROW }], // congela hasta la fila 9
  });

  // Set column widths
  headers.forEach((h, idx) => {
    ws.getColumn(idx + 1).width = h.width;
  });

  // ====== TOP AREA (como la imagen) ======
  // Título en A2:M3
  const lastCol = headers.length; // 13 -> columna M
  const startColLetter = "A";
  const endColLetter = ws.getColumn(lastCol).letter; // M

  ws.mergeCells(`${startColLetter}2:${endColLetter}3`);
  const titleCell = ws.getCell("A2");
  titleCell.value = "CORDOBA PISTA";
  titleCell.font = { bold: true, italic: true, size: 18, color: { argb: "FFFFFFFF" } };
  titleCell.alignment = { vertical: "middle", horizontal: "left" };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF3F3F3F" } };

  ws.getRow(2).height = 22;
  ws.getRow(3).height = 22;

  // Metadata filas 5 y 6
  ws.getCell("A5").value = "Archivo:";
  ws.getCell("B5").value = `${normalizeXlsxFileName(filename)}`;

  ws.getCell("A6").value = "Fecha de descarga:";
  ws.getCell("B6").value = new Date();
  ws.getCell("B6").numFmt = "d/m/yyyy";

  ["A5", "A6"].forEach((addr) => {
    const c = ws.getCell(addr);
    c.font = { bold: false };
    c.alignment = { vertical: "middle", horizontal: "left" };
  });

  ["B5", "B6"].forEach((addr) => {
    const c = ws.getCell(addr);
    c.alignment = { vertical: "middle", horizontal: "left" };
  });

  // ====== TABLE HEADER ROW (fila 9) ======
  const headerRow = ws.getRow(TABLE_HEADER_ROW);
  headerRow.values = headers.map((h) => h.header);
  headerRow.height = 18;

  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF333333" } };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "FF999999" } },
      left: { style: "thin", color: { argb: "FF999999" } },
      bottom: { style: "thin", color: { argb: "FF999999" } },
      right: { style: "thin", color: { argb: "FF999999" } },
    };
  });

  // Autofilter en fila 9
  ws.autoFilter = {
    from: { row: TABLE_HEADER_ROW, column: 1 },
    to: { row: TABLE_HEADER_ROW, column: headers.length },
  };

  // ====== DATA ROWS (desde fila 10) ======
  rows.forEach((r) => {
    ws.addRow([
      r.pilot_name ?? "",
      r.surname ?? "",
      r.event ?? "",
      r.name_circuits ?? "",
      r.category ?? "",
      getDate(r.event_date),
      getTime(r.event_date),
      r.tire_n1 ?? "",
      r.tire_n2 ?? "",
      r.tire_n3 ?? "",
      r.tire_n4 ?? "",
      r.tire_n5 ?? "",
      r.tire_n6 ?? "",
    ]);
  });

  // Body style + zebra (solo desde DATA_START_ROW)
  ws.eachRow((row, rowNumber) => {
    if (rowNumber < TABLE_HEADER_ROW) return; // no tocar el top area
    if (rowNumber === TABLE_HEADER_ROW) return;

    row.height = 16;

    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "left", wrapText: false };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE0E0E0" } },
        left: { style: "thin", color: { argb: "FFE0E0E0" } },
        bottom: { style: "thin", color: { argb: "FFE0E0E0" } },
        right: { style: "thin", color: { argb: "FFE0E0E0" } },
      };
    });

    // zebra
    if ((rowNumber - DATA_START_ROW) % 2 === 1) {
      row.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF7F7F7" } };
      });
    }
  });

  // Download
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = normalizeXlsxFileName(filename);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
