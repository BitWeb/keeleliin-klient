FROM    ubuntu

MAINTAINER priit@bitweb.ee

RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install python build-essential nodejs

COPY . /

RUN cp -R -u -p app/config/global_dist.js app/config/global.js

RUN npm install

EXPOSE  3001

CMD ["npm", "start"]