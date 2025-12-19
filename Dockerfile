# WebdriverIO-Cucumber Test Framework Docker Image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Chrome
RUN apk add --no-cache \
    chromium \
    chromium-chromedriver \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    udev \
    wget

# Set Chrome path
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci --prefer-offline --no-audit && \
    npm cache clean --force

# Copy application files
COPY . .

# Create necessary directories
RUN mkdir -p \
    test-results \
    allure-results \
    screenshots \
    .wdio-results

# Set permissions
RUN chmod -R 755 /app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node --version || exit 1

# Default command
CMD ["npm", "test"]
