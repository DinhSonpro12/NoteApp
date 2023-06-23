
# **NoteApp**
**NoteApp** is a simple note-taking application built using ***ReactJS*** and ***NodeJS Express***. This application allows users to create, edit and delete personal notes. 

# **Table of contents**

- [**NoteApp**](#noteapp)
- [**Table of contents**](#table-of-contents)
- [**Introductions**](#introductions)
- [**Project structure**](#project-structure)
- [**Technologies**](#technologies)
- [**Install \& Usage**](#install--usage)
  - [***Install***](#install)
  - [***Config***](#config)
    - [**Config TailwindCss**:](#config-tailwindcss)
    - [**Config Firebase**:](#config-firebase)
    - [**Config Database**:](#config-database)
  - [***Run***](#run)
- [**Feature**](#feature)
- [**Illustrations**](#illustrations)
- [**Deployment**](#deployment)
- [**Author**](#author)

# **Introductions**
The **NoteApp** project is divided into **two** main parts:

- ***Client Side***: Built using **ReactJS** and contains user interface components, functionality to interact and communicate with the server side via API.

- ***Server Side***: Built with **Node.js - Express** handles client requests, connects to the **MongoDB** database, and integrates user authentication via **Firebase Authentication**.
 

# **Project structure**

```
NoteApp/                  <Project>
├── client/               : Client-side source code directory, built using ReactJS.
│   ├── src/              : Folder source.
│   │   ├── component     : Small and reusable interface components.
│   │   ├── context       : Manage authentication status.
│   │   ├── firebase      : Configuration and connection information for Firebase.
│   │   ├── pages         : Contain main pages: Login, Home and ErrorPage.
│   │   ├── router        : Manage, configure and process routes.
│   │   ├── utilities     : API handling functions & Domain Server.
│   │   └── main.jsx      : React app initialization.
│   └── index.html        : The root HTML page of the ReactApp.
|
|
└── server/               : Server-side source code directory, built using Node.js Express.
    └── src/              : Folder source.
        ├── config/       : Contain Configurations.
        │   ├── db        : Configuration of Database (MongoDB).
        │   └── firebase  : Configuration of Firebase.
        ├── controllers   : Defind controllers Logical handling of requests from the client.
        ├── model         : Contains source code files that define and interact with the database.
        ├── routes        : Handle routes and HTTP requests from the client.
        └── index.js      : Server startup file, Install and configure Expressd.

```


# **Technologies**
* **Client**:` ReactJS, JavaScript, HTML, TailwindCSS, RESTful API.`
* **Server**:` NodeJS, Express, MongoDB, Firebase Authentication & Authorization`



# **Install & Usage** 
## ***Install***
cd NoteApp
Cài đặt các dependencies cho phía client (ReactJS):
bash
Copy code
cd client
npm install
Cài đặt các dependencies cho phía server (Node.js Express):
bash
Copy code
cd ../server
npm install

## ***Config***
### **Config TailwindCss**:
### **Config Firebase**:
- Client:
- Server:
### **Config Database**:

Tạo một tài khoản Firebase và kích hoạt Firebase Authentication.
Lấy thông tin cấu hình của Firebase (API key, project ID, etc.).

Cấu hình kết nối với cơ sở dữ liệu MongoDB trong tệp 


## ***Run***
Chạy phía client (ReactJS):
bash
Copy code
cd client
npm start
Chạy phía server (Node.js Express):
bash
Copy code
cd ../server
npm start
Sau khi cài đặt và chạy ứng dụng thành công, bạn có thể truy cập NoteApp thông qua trình duyệt với đường dẫn:

arduino
Copy code
http://localhost:3000
Ứng dụng sẽ hiển thị giao diện người dùng để tạo và quản lý các ghi chú cá nhân. Bạn sẽ cần đăng nhập bằng tài khoản Firebase để sử dụng các tính năng của ứng dụng.
# **Feature**
# **Illustrations**
# **Deployment**
**Deploy a Client (ReactJS) using [Netlify](https://www.netlify.com/)**:
- To implement the client (ReactJS), i use [Netlify](https://www.netlify.com/) which is a popular platform for hosting static websites and offers seamless integration with GitHub.

**Deploy a Server (Node.js Express) using [Render](https://render.com/):**
- For server deployment (Node.js Express), [Render](https://render.com/) is a suitable choice which is a cloud hosting platform that provides simplicity and scalability for my server-side applications.

> ***My project's deployment***: [**NoteApp**](https://main--comforting-moonbeam-02140b.netlify.app/)

# **Author**
***Name***: [**Dinh Trong Tung Son**](https://github.com/DinhSonpro12)

***Email***: dinhtrongtungson2626@gmail.com
***
**`If you have any questions or suggestions, feel free to contact me via email.`**


