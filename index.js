// Mengimpor library discord.js
const Discord = require('discord.js');

// Membuat instance dari client Discord
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'] // Mengaktifkan intent yang diperlukan
});

// Uptime ping function
const http = require('http');
const PORT = process.env.PORT || 3000; // Mendapatkan PORT dari environment variable
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Website ini dibuat oleh HendraCoders');
  res.end();
}).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // Menampilkan pesan saat server siap
});

// Variabel untuk menyimpan waktu yang telah berlalu
let elapsedTime = 0; // dalam detik

// Fungsi untuk memperbarui waktu dan status
const updatePresence = () => {
  const hours = Math.floor(elapsedTime / 3600); // Menghitung jam
  const minutes = Math.floor((elapsedTime % 3600) / 60); // Menghitung menit
  const seconds = elapsedTime % 60; // Menghitung detik
  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  client.user.setPresence({
    activities: [{
      name: 'Vibe City',
      type: 'PLAYING',
      state: timeString, // Waktu online dalam format HH:MM:SS
      details: 'Online 24/7',
      assets: {
        largeImage: 'large-image-url', // Ganti dengan URL gambar besar
        smallImage: 'small-image-url', // Ganti dengan URL gambar kecil
        largeText: 'Gambar besar',
        smallText: 'Gambar kecil'
      },
      timestamps: {
        start: Date.now()
      }
    }],
    status: 'online'
  })
  .then(() => console.log(`Status aktivitas diperbarui ke: ${timeString}`))
  .catch(console.error);
};

client.on('ready', () => {
  console.log('Akun Discord Anda online!');
  updatePresence();
  setInterval(() => {
    elapsedTime++;
    updatePresence();
  }, 1000);
});

// Mengambil token dari environment variables yang di-set di Render.com
const token = process.env.DISCORD_TOKEN;
client.login(token)
  .then(() => console.log('Login berhasil!'))
  .catch(console.error);
        
