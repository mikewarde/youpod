var http = require('http');
var fs = require('fs');
var shell = require('shelljs') 
var path  = require('path') 
const { generate_rss }  = require('./generate_rss.js');
const { parse } = require('querystring');
const XMLPATH = '/usr/share/nginx/html/'

generate_rss('music', XMLPATH); 
