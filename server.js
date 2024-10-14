const http = require("http");
const url = require("url");

// Data pengguna
let users = [
  { id: 1, name: "Hafidz Karim", email: "hafidzkarim18@Gmail.com" },
  { id: 2, name: "Salsabilla", email: "salsabilla005@gmail.com" },
  { id: 3, name: "Najwa", email: "najwa@gmail.com"},
  [ "id: 40083", "name: Apin", "Kucing Anggora dari kampung sebelah" ]
];

// Membuat server HTTP
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Halaman utama dengan informasi API
  if (method === "GET" && path === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      "Selamat datang di API pengguna dan silahkan gunakan api/users untuk melihat users berdasarkan ID"
    );
  }

  // API untuk mendapatkan semua pengguna
  else if (method === "GET" && path === "/api/users") {
    // @tampilkan seluruh user
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(users))
  }
  
  // API untuk mendapatkan pengguna berdasarkan ID
  else if (method === "GET" && path.startsWith("/api/users/")) {
    const id = parseInt(path.split("/").pop(), 10);
    const user = users.find((user) => user.id === id);

    if (user) {
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(user));
    } 
    else {
      res.writeHead(404, {'Content-Type' : 'aplication/json'});
      res.end('Pengguna tidak ditemukan');
    }
  }
  // Jika URL tidak ditemukan
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Menjalankan server di port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
