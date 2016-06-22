import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowSameOriginForAll("*");
BrowserPolicy.content.allowDataUrlForAll("*");
BrowserPolicy.content.allowOriginForAll("*");