[%- SRC_LOC="_libCommon.js" -%]


/**
*
* @param {string|null|undefined} val_ the value to unnull.
* @param {string} ifnull_ the value to return if null.
* @return {string}  the unnulled value.
*/
var nz = function(val_, ifnull_) {
if (val_ == undefined || val_ == null) return ifnull_;
return val_;
};


