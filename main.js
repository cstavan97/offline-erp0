// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html'); // This is your login page
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create the database connection
const dbPath = path.join(__dirname, 'db', 'erp.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to the ERP SQLite database.');
  }
});

// Handle user login
ipcMain.handle('login-user', async (event, username, password) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (err) {
        console.error('Database login error:', err.message);
        reject(err);
      } else {
        resolve(row); // If null, login failed. If object, login success.
      }
    });
  });
});

app.whenReady().then(createWindow);

// Handle macOS specific behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
