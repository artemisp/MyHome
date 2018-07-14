# MyHome

This chrome extension replaces the new tab page with a page that allow users to log in and access their saved widgets.

When new tab clicks, MyHome appears. 
If not logged in, it shows the time, an empty todo, an empty notepad, and the most visited links.
The user can log in to save data on these widgets, choose which of these widgets to display, as well as change the background.

In the upper right corner there will be a button which will redirect to login. Users that login will be able to save their todo and notes lists across devices by logging in (authentication, database-MongoDB).


Instructions (MAC OS):

If you do not have node.js installed in your computer follow the steps bellow to do so:
1. Install Homebrew (follow the instructions at https://brew.sh)
2. Install Node.js by pasting 'brew install node' in your terminal

CHECK POINT:
To test if you have successfully installed node.js paste 'node -v' on your terminal; it should print something like 'v10.6.0'

If you do not have mongodb installed in your computer follow the steps bellow to do so:
1. If you have not installed Homebrew follow the instructions listed above to do so.
2. Install mongodb by pasting 'brew install mongodb' in your terminal


Now you should be ready to run the app.

1. Go to the directory of the folder that contains MyHome
2. Paste 'mongod' in the terminal to get mongodb running.
3. Open a new terminal window in the same directory and paste 'node app.js'
4. Open google chrome and go to chrome://extensions/
5. On the upper right corner set developer mode on
6. Select Load Unpacked and select the directory that contains MyHome. Do not forget to make sure that extension is enabled.
7. Open a new tab and explore the application.

I hope you enjoy!