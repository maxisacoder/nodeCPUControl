FROM    centos:latest

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
RUN     rpm -i http://pkgs.repoforge.org/stress/stress-1.0.2-1.el6.rf.x86_64.rpm
#RUN     yum install -y stress
#RUN     yum install -y stress-ng
# Install Node.js and npm
RUN     yum install -y nodejs npm

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE  3000
CMD ["node", "/src/bin/www"]
