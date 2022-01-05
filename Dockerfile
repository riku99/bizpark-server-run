FROM node:14
RUN apt-get update \
    && apt-get install -y ffmpeg
WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY . /app/
CMD ["./start.sh"]