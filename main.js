//Import app and BrowserWindow modules of electron
const { app, BrowserWindow, Menu} = require('electron')

//pulls url module and path module from node.js
const url = require('url')
const path = require("path");
const { profile } = require('console');

//var to represent main window
let mainWindow;
let profileWindow; //var for profile


function createWindow () {
    //Create BrowserWindow and set it equal to main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //Opens the index.html file using the new browser window we created
  mainWindow.loadFile('index.html')

  //Function to create a profile window
  function createProfileWindow(){
    profileWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })
      profileWindow.loadFile('profile.html')
  }

  //Define Main Menu
  //Menus in electron are arrays
  const mainMenu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
              {label: 'Profile',
            click(){
                createProfileWindow();
            }},
              {label: 'Label 2'},
              {
                  label: 'Quit',
                  //accelerator = KEYBOARD SHORTCUT
                  //Since shortcuts work differently for different platforms,
                  //we check with the process.platform module.
                  //"darwin" is the value given if we are on a Mac.
                  //The following line says "if Mac, then use command+q, else use ctrl+q"
                  accelerator: process.platform == 'darwin' ? "Command+Q" : "Ctrl+Q",
                  click(){
                      app.quit();
                  }
              }
          ],
      }
  ])

  //Insert Menu
  Menu.setApplicationMenu(mainMenu)
}

//Electron "listens" for you to open the window.
app.whenReady().then(createWindow)

//Program quits when you close the window (Unlike Discord, lmao)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


