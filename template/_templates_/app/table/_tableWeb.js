[%divId="table"%]
[%SRC_LOC="_" _ divId _ "Web.js"%]

goog.provide('[%divId%]Web');
goog.require('[%divId%]WebView');
goog.require('ma.plugin.table');

/**
 *
 * SRC: [%SRC_LOC%]
 * @constructor
 */
[%divId%]Web = function(){
   this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  App.dispatch['[%divId%]'] = [%divId%]Web.show;

}
/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
[%divId%]Web.prototype.logger_ = goog.debug.Logger.getLogger('[%divId%]');

/**
 * SRC: [%SRC_LOC%]
 * @extends {PageHelper}
 * @param {Object} args_ the args to pass to the show function.
 *
 */
[%divId%]Web = function(args_) {
  var rows = [
  {
    id: 0,
      name: 'A'
  },
  {
    id: 1,
    name: 'B'
  },
  {
    id: 2,
    name: 'C'
  },
  {
    id: 3,
    name: 'D'
  },
  {
    id: 4,
    name: 'A'
  }
  ];
  app.setMainContent([%divId%]WebView.getPrimary(null, null));
  var tbl = new ma.plugin.table();
  tbl.data = rows;
  tbl.addColumn(new ma.ColumnDef({name: 'id'}));
  tbl.addColumn(new ma.ColumnDef({name: 'name'}));
  tbl.sortColumns = ['name'];
  tbl.sortOrder = 'ASC';
  tbl.idColumn = 'id';
  tbl.trIdPrefix = 'test';
  tbl.decorate(goog.dom.getElement('testskidoo'));

};

goog.inherits([%divId%]Web, PageHelper);

[%divId%]Web.prototype.disposeInternal = function(){
  goog.dispose(this.eh1);
}


/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
[%divId%]Web.prototype.logger_ = goog.debug.Logger.getLogger('[%divId%]');
App.dispatch['[%divId%]'] = function (){new [%divId%]Web();};


