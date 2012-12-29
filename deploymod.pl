#!/usr/bin/perl -pi
BEGIN{undef $/;} 
s/<\!--BUILDONLY_BEGIN.*END-->/<script type="text\/javascript" src="app-compiled.js"><\/script>/smg;
