FROM gaiaadm/nodejs:4.4.3

# Set the working directory
WORKDIR /src

# Bundle app source
COPY . /src

# setup.sh script is temporary workaround until Docker adds support for passing ENV variables
# to docker build command to allow setting up proxy
ADD setup.sh /tmp/setup.sh
RUN chmod +x /tmp/setup.sh && sync && /tmp/setup.sh /src

RUN npm install && npm install -g webpack && webpack

EXPOSE  4000
CMD ["npm", "start"]