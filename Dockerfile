FROM node:14
RUN apt-get update \
    && apt-get install -y ffmpeg
WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY . /app/
RUN rm -rf node_modules/sharp
RUN yarn add --arch=x64 --platform=linux sharp
CMD ["./start.sh"]