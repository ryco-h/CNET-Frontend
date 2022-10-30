export default function formatHarga(harga) {

   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(harga)
}