
# 📝 Todo App – Docker Deployment on AWS

This is a simple **Todo App** project designed to test app deployment using **Docker**, **AWS EC2**, **AWS RDS**, and **GitHub**.

---

## 🚀 Technologies Used

- Docker & Docker Compose  
- AWS EC2 (Ubuntu Instance)  
- AWS RDS (MySQL)  
- Git & GitHub  
- Node.js (Backend)  
- React (Frontend)

---

## 🛠️ Setup Instructions

### ✅ Step 1: Launch AWS EC2 Instance

1. Create a **public EC2 instance** (Ubuntu).
2. Configure the **Security Group**:

   **Inbound Rules:**
   - SSH – `22`
   - HTTP – `80`
   - HTTPS – `443`
   - MySQL – `3306`
   - Custom TCP (Backend server) – `3000`

   **Outbound Rules:**
   - HTTPS – `443` (for Git access)

---

### 🔑 Step 2: Access Your EC2 Instance via SSH

```bash
ssh -i <key-pair> ubuntu@<aws ec2 public ip>
```
```bash
sudo -i
```

---

### 📦 Step 3: Install Dependencies

```bash
apt update && apt install git docker.io docker-compose mysql-client -y
```

---

### 🗄️ Step 4: Set Up MySQL with AWS RDS

1. Launch an **RDS MySQL** instance.
2. Create a database (e.g., **todoappdocker**) using credentials like:
    - Username: **admin**
    - Password: **<your-master-password>**

---

### 🛢️ Step 5: Connect to RDS and Create Table

```bash
mysql -h <rds_endpoint> -u <db name> -p
```


```bash
CREATE DATABASE <enter your database name, eg: todoappdocker>;
```
```bash
USE <enter your database name, eg: todoappdocker>;
```
```bash
CREATE TABLE todos (
    id INT AUTO_INCREAMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
```
```bash
   exit
```
---

### 🔐 Step 6: Verify Git and Docker

```bash
git -v
```
```bash
docker -v
```
---

### 🔐 Step 7: Setup SSH Key for GitHub Access

```bash
ssh-keygen -t ed25519 -C "ec2 instance key"
```
```bash
cat ~/.ssh/id_ed25519.pub
```
- Copy the output.

- Go to GitHub → Settings → SSH and GPG Keys → New SSH Key, and paste it.
---

### 📥 Step 8: Clone the Repository

```bash
git clone https://github.com/krunalbhandekar/todo-docker.git
```
---

### ⚙️ Step 9: Configure Frontend

Edit the App.js file:
```bash
vim /todo-docker/frontend/src/App.js
```
Update the server URL:
```bash
const SERVER_URL="http://<ec2_public_ip>:3000/todos"
```
---

### 🧪 Step 10: Set Up Backend Environment Variables

```bash
ls
```
```bash
cd todo-docker
```
```bash
vim backend/.env
```
Add the following:
```bash
DB_HOST=<RDS_ENDPOINT_URL>
DB_USER=<db name (admin)>
DB_PASSWORD=<DB MASTER PASSWORD>
DB_NAME=<enter your database name, eg: todoappdocker>
DB_PORT=3306
PORT=3000
```
Then build and run the app:
```bash
docker-compose up --build -d
```
---

### 🌐 Step 11: Access the App

```bash
Frontend: http://<ec2_public_ip>
```
```bash
Backend: http://<ec2_public_ip>:3000/todos
```
