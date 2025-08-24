// Fungsi utama menyimpan data dari form web
function simpanData(form) {
  try {
    var ssId = PropertiesService.getScriptProperties().getProperty('REKAP_SPREADSHEET_ID');
    if (!ssId) throw new Error('REKAP_SPREADSHEET_ID belum dikonfigurasi.');

    var ss = SpreadsheetApp.openById(ssId);
    var sheet = ss.getSheetByName('Rekap Anomali');
    if (!sheet) throw new Error("Sheet 'Rekap Anomali' tidak ditemukan.");

    // Ambil header sebagai acuan kolom
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Siapkan data sesuai urutan header
    var data = headers.slice(1).map(function (h) {
      return form[h] || '';
    });

    // Gabungkan dengan timestamp
    var row = [new Date()].concat(data);

    if (row.length !== headers.length) {
      throw new Error(`Jumlah data (${row.length}) tidak sesuai jumlah kolom (${headers.length}).`);
    }

    sheet.appendRow(row);

    return { success: true, message: "Data berhasil disimpan." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menampilkan Web UI
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Form Laporan Anomali')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Fungsi helper untuk menyertakan file HTML terpisah jika diperlukan
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function buatFormLaporan() {
  try {    
    // Buat spreadsheet untuk rekap
    var rekapSS = SpreadsheetApp.create("Rekap Laporan Anomali GADA ANOMAN");
    var rekapSheet = rekapSS.getActiveSheet();
    rekapSheet.setName("Rekap Anomali");
    
    // Set header rekap
    var headers = [
      "Timestamp", "LAPORAN", "Hari/Tanggal", "UPT",
      // A. ANOMALI JARINGAN
      // 1. ROW Kritis
      "ROW Kritis - Kritis", "ROW Kritis - Bahaya 1", "ROW Kritis - Rencana Tindak lanjut",
      "ROW Kritis - Rencana Hari ini - Kritis", "ROW Kritis - Rencana Hari ini - Bahaya (B1)",
      "ROW Kritis - Realisasi Hari ini - Kritis", "ROW Kritis - Realisasi Hari ini - Bahaya 1", "ROW Kritis - STATUS",
      // 2. Pentanahan Tower Buruk
      "Pentanahan Tower - Jumlah Anomali", "Pentanahan Tower - Rencana Tindak lanjut",
      "Pentanahan Tower - Rencana Hari ini", "Pentanahan Tower - Realisasi Hari ini", "Pentanahan Tower - STATUS",
      // 3. Anomali Isolator
      "Isolator - Jumlah Anomali", "Isolator - Rencana Tindak lanjut",
      "Isolator - Rencana Hari ini", "Isolator - Realisasi Hari ini", "Isolator - STATUS",
      // B. ANOMALI HARGI
      // 1. Hotspot HV
      "Hotspot HV - Jumlah Anomali", "Hotspot HV - Rencana Tindak lanjut",
      "Hotspot HV - Rencana Hari ini", "Hotspot HV - Realisasi Hari ini", "Hotspot HV - STATUS",
      // 2. Anomali MTU
      "MTU - Jumlah Anomali", "MTU - Rencana Tindak lanjut",
      "MTU - Rencana Hari ini", "MTU - Realisasi Hari ini", "MTU - STATUS",
      // 3. Pentanahan GI
      "Pentanahan GI - Jumlah Anomali", "Pentanahan GI - Rencana Tindak lanjut",
      "Pentanahan GI - Rencana Hari ini", "Pentanahan GI - Realisasi Hari ini", "Pentanahan GI - STATUS",
      // C. ANOMALI HARPRO
      // 1. Relay Error
      "Relay - Jumlah Anomali", "Relay - Rencana Tindak lanjut",
      "Relay - Rencana Hari ini", "Relay - Realisasi Hari ini", "Relay - STATUS",
      // 2. Hotspot Sekunder
      "Hotspot Sekunder - Jumlah Anomali", "Hotspot Sekunder - Rencana Tindak lanjut",
      "Hotspot Sekunder - Rencana Hari ini", "Hotspot Sekunder - Realisasi Hari ini", "Hotspot Sekunder - STATUS"
    ];
    
    rekapSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    
    // Simpan ID spreadsheet rekap di Properties
    PropertiesService.getScriptProperties().setProperty('REKAP_SPREADSHEET_ID', rekapSS.getId());
    
    // Beri akses edit ke pemilik
    rekapSS.addEditor(Session.getActiveUser().getEmail());

    var pesan = 'Spreadsheet Rekap berhasil dibuat!\n\n' +
                'Rekap Laporan: ' + rekapSS.getUrl();
      
    Logger.log(pesan);
    console.log(pesan);
    
    // Coba tampilkan alert hanya jika dalam konteks UI
    try {
      var ui = SpreadsheetApp.getActiveSpreadsheet().getUi();
      ui.alert(pesan);
    } catch (e) {
      // Abaikan error jika tidak dalam konteks UI
    }
    
    return {
      success: true,
      message: pesan,
      rekapUrl: rekapSS.getUrl()
    };
  } catch (error) {
    Logger.log("Error: " + error.message);
    console.error(error);
    return {
      success: false,
      message: "Error: " + error.message
    };
  }
}