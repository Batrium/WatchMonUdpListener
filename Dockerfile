FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm install -g @vercel/ncc
RUN ncc build index.js -o dist
RUN rm -rf node_modules
CMD ["node", "dist/index.js"]

EXPOSE 18542/udp
