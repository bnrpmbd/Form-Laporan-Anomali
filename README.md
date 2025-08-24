# Form Laporan Anomali — Google Apps Script

**Deskripsi singkat**  
Form laporan anomali berbasis **Google Apps Script & Google Sheets** untuk input harian (Pagi / Sore) dan rekap otomatis ke spreadsheet.

---

## Isi repo
- `Code.js` — backend Google Apps Script (penyimpanan data, pembuatan spreadsheet, `doGet()` dll).  
- `Index.html` — tampilan/form (HTML + client-side JS).

---

## Prasyarat
- Akun Google aktif.  
- Izin membuat / mengedit Google Spreadsheet pada akun yang menjalankan script.

---

## Instalasi & Deploy (singkat)
1. Buka **script.google.com** → buat project Apps Script baru.  
2. Tambahkan file `Code.js` dan `Index.html`, lalu paste kode masing-masing.  
3. (Opsional) Jalankan fungsi `buatFormLaporan()` di editor Apps Script untuk membuat Google Spreadsheet rekap dan otomatis mengisi `REKAP_SPREADSHEET_ID`.  
   - Alternatif: buat spreadsheet manual dan set `REKAP_SPREADSHEET_ID` di Script Properties:
   ```js
   PropertiesService.getScriptProperties().setProperty('REKAP_SPREADSHEET_ID', '<SPREADSHEET_ID>');
   ```
4. Deploy → **New deployment** → pilih **Web app**  
   - **Execute as**: Me (your account)  
   - **Who has access**: pilih sesuai kebutuhan (mis. Anyone with Google account)  
5. Salin URL Web App — akses halaman form lewat URL tersebut.

---

## Penggunaan
1. Buka URL Web App.  
2. Pilih jenis laporan: **Pagi** atau **Sore**.  
3. Isi field yang diperlukan lalu tekan **Kirim**.  
4. Data akan tersimpan otomatis ke sheet bernama **Rekap Anomali**.

---

## Konfigurasi penting
- `REKAP_SPREADSHEET_ID` harus terisi di Script Properties agar `simpanData()` bisa menulis data.  
- Nama sheet default: **Rekap Anomali** — ubah kode jika ingin nama lain.  
- Header/kolom rekap dapat diubah pada array `headers` di fungsi `buatFormLaporan()` (Code.js).

---

## Troubleshooting cepat
- **Spreadsheet not found** → periksa `REKAP_SPREADSHEET_ID`.  
- **Sheet tidak ditemukan** → pastikan ada sheet bernama `Rekap Anomali` atau ubah referensi di `Code.js`.  
- Cek menu **Executions** dan **Logs** di Apps Script editor untuk detail error.

---

## Kustomisasi
- Tambah/hapus kolom rekap: edit array `headers` di `Code.js`.  
- Ubah tampilan/form: edit `Index.html` (HTML / CSS / client JS).  
- Ubah hak akses Web App sesuai kebutuhan organisasi.

---

## Kontribusi
1. Fork repository  
2. Buat branch fitur (`feature/nama-fitur`)  
3. Commit dan push  
4. Buat Pull Request  
> Untuk perubahan besar, buka issue dulu agar bisa didiskusikan.

---

## Lisensi
Direkomendasikan: **MIT License** (sesuaikan bila organisasi Anda menggunakan lisensi lain).

---

## Kontak
Jika butuh bantuan deploy atau penyesuaian, beri tahu saya — saya bantu.
