FROM    ubuntu

MAINTAINER priit@bitweb.ee

RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install python build-essential nodejs

COPY . /
RUN npm install

EXPOSE  3000

CMD ["npm", "start"]