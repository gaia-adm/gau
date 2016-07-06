#!/bin/bash

function test_connection()
{
    curl --connect-timeout 5 -s -X OPTIONS http://www.google.com >> /dev/null
}

function setup_proxy()
{
    proxies[0]=http://proxy.bbn.hp.com:8080
    proxies[1]=http://web-proxy.israel.hp.com:8080

    # first try no proxy
    test_connection

    if [ $? -eq 0 ];then
       echo "No proxy is necessary"
       return 0
    else
       echo "Detecting suitable proxy server.."
       for i in "${proxies[@]}"
       do
           export http_proxy=$i
           export https_proxy=$i
           export no_proxy=localhost,127.0.0.1

           test_connection
           if [ $? -eq 0 ];then
               echo "Connection through proxy "$i" was successful"
               return 0
           fi
       done
    fi
    echo "No suitable proxy was found"
    return 1
}

function setup_container()
{
    echo "Setting up container.."

    cd /src
    npm install
}

setup_proxy

if [ $? -eq 0 ];then
    setup_container
else
    echo "Unable to continue setup"
    exit 1
fi
