goog.provide('PageHelper');
goog.require('goog.Disposable');
/**
 * @constructor
 * @extends {goog.Disposable}
 */
PageHelper = function(){
  
}
goog.inherits (PageHelper, goog.Disposable);

PageHelper.prototype.init = function(pageId) {
  this.eh1 = new goog.events.EventHandler();
}


