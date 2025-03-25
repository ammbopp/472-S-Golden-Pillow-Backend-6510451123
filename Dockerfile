FROM node:18

# ติดตั้ง curl และ Dockerize
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sSL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar xz -C /usr/local/bin

# ติดตั้ง dependencies สำหรับ canvas และเครื่องมือที่จำเป็น
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libgif-dev \
    libjpeg-dev \
    libpng-dev \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies และ canvas
RUN npm install && npm install canvas@2.6.1 --build-from-source

# คัดลอกโค้ดทั้งหมด
COPY . .

EXPOSE 13889

# รันคำสั่ง dev
CMD ["npm", "run", "dev"]
