FROM node:22-alpine AS builder
WORKDIR /app
COPY wdm-notebook/package.json ./
RUN npm install
COPY wdm-notebook/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html/wdm-notebook
COPY deploy/nginx/notebook.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
