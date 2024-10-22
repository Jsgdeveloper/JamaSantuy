// Mengimpor library discord.js
const Discord = require('discord.js');

// Membuat instance dari client Discord dengan intents yang diperlukan
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent // Tambahkan intent ini jika bot perlu membaca konten pesan
  ],
});

// Variabel untuk menyimpan waktu yang telah berlalu
let elapsedTime = 0; // dalam detik

// Fungsi untuk memperbarui waktu dan status
const updatePresence = () => {
  // Menghitung jam, menit, dan detik
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  // Format waktu menjadi string "HH:MM:SS"
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Mengatur status aktivitas akun Discord
  client.user.setPresence({
    activities: [{
      name: 'Vibe City',
      type: 'PLAYING',
      details: 'Online 24/7',
      state: timeString,
      assets: {
        largeImage: 'large-image-url', // Ganti dengan URL gambar besar
        smallImage: 'small-image-url', // Ganti dengan URL gambar kecil
        largeText: 'Gambar besar',
        smallText: 'Gambar kecil'
      },
      timestamps: {
        start: Date.now() // Waktu mulai
      }
    }],
    status: 'online' // Status online
  })
  .then(() => console.log(`Status streaming diperbarui ke: ${timeString}`))
  .catch(console.error);
};

// Event yang dijalankan ketika client siap
client.on('ready', () => {
  console.log('Akun Discord Anda online!');
  console.log('Website ini dibuat oleh hendraCoders'); // Pesan informasi
  
  // Memperbarui status awal
  updatePresence();

  // Mengupdate waktu setiap detik
  setInterval(() => {
    elapsedTime++;
    updatePresence();
  }, 1000); // 1000 ms = 1 detik
});

// Ambil token dari environment variable
const token = process.env.DISCORD_TOKEN;

// Login ke Discord menggunakan token dari environment variable
client.login(token)
  .then(() => console.log('Login berhasil!'))
  .catch(error => console.error('Error saat login:', error));
